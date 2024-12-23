import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/student";
import mongoose from "mongoose";

interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  numeroControl?: string;
  minAge?: string;
  maxAge?: string;
}

interface FilterCriteria {
  $or?: any[];
  numeroControl?: any;
  age?: {
    $gte?: number;
    $lte?: number;
  };
}

export async function getStudent(request: NextRequest) {
  try {
    await connectDB();

    // Extraer parámetros de la URL
    const { searchParams } = new URL(request.url);
    const params: QueryParams = {
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '10',
      search: searchParams.get('search') ?? '',
      sortBy: searchParams.get('sortBy') ?? 'name',
      order: (searchParams.get('order') as 'asc' | 'desc') ?? 'asc',
      numeroControl: searchParams.get('numeroControl') ?? '',
      minAge: searchParams.get('minAge') ?? '',
      maxAge: searchParams.get('maxAge') ?? ''
    };

    // Construir criterios de filtrado
    const filterCriteria: FilterCriteria = {};

    // Búsqueda general por nombre o número de control
    if (params.search) {
      filterCriteria.$or = [
        { name: { $regex: params.search, $options: 'i' } },
        { numeroControl: { $regex: params.search, $options: 'i' } }
      ];
    }

    // Filtro específico por número de control
    if (params.numeroControl) {
      filterCriteria.numeroControl = { $regex: params.numeroControl, $options: 'i' };
    }

    // Filtro por rango de edad
    if (params.minAge || params.maxAge) {
      filterCriteria.age = {};
      if (params.minAge) filterCriteria.age.$gte = parseInt(params.minAge || '0');
      if (params.maxAge) filterCriteria.age.$lte = parseInt(params.maxAge || '0');
    }

    // Configurar paginación
    const page = parseInt(params.page || '1');
    const limit = parseInt(params.limit || '10');
    const skip = (page - 1) * limit;

    // Ejecutar consulta con todos los filtros
    const [students, totalStudents] = await Promise.all([
      Student.find(filterCriteria)
        .sort({ [params.sortBy as string]: params.order || 'asc' })
        .skip(skip)
        .limit(limit)
        .select('-__v'),
      Student.countDocuments(filterCriteria)
    ]);

    // Calcular metadatos de paginación
    const totalPages = Math.ceil(totalStudents / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Construir enlaces de paginación
    const baseUrl = new URL(request.url);
    const nextPageUrl = new URL(baseUrl.toString());
    const prevPageUrl = new URL(baseUrl.toString());
    
    nextPageUrl.searchParams.set('page', (page + 1).toString());
    prevPageUrl.searchParams.set('page', (page - 1).toString());

    return NextResponse.json({
      success: true,
      data: students,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalStudents,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? nextPageUrl.pathname + nextPageUrl.search : null,
        prevPage: hasPrevPage ? prevPageUrl.pathname + prevPageUrl.search : null
      },
      queryParams: {
        search: params.search,
        sortBy: params.sortBy,
        order: params.order,
        filters: {
          numeroControl: params.numeroControl,
          ageRange: {
            min: params.minAge || null,
            max: params.maxAge || null
          }
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error en GET /api/students:', error);
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
    }, { status: 500 });
  }
}