import { supabase } from './supabase'

// Generic database operations
export class DatabaseService {
  
  // Insert a single record
  static async insert(table: string, data: any) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single()

      if (error) {
        console.error(`Error inserting into ${table}:`, error)
        throw error
      }

      return result
    } catch (error) {
      console.error(`Exception inserting into ${table}:`, error)
      throw error
    }
  }

  // Insert multiple records
  static async insertMany(table: string, data: any[]) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()

      if (error) {
        console.error(`Error inserting multiple records into ${table}:`, error)
        throw error
      }

      return result
    } catch (error) {
      console.error(`Exception inserting multiple records into ${table}:`, error)
      throw error
    }
  }

  // Update a record
  static async update(table: string, id: string, data: any) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error(`Error updating ${table}:`, error)
        throw error
      }

      return result
    } catch (error) {
      console.error(`Exception updating ${table}:`, error)
      throw error
    }
  }

  // Delete a record
  static async delete(table: string, id: string) {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) {
        console.error(`Error deleting from ${table}:`, error)
        throw error
      }

      return true
    } catch (error) {
      console.error(`Exception deleting from ${table}:`, error)
      throw error
    }
  }

  // Get a single record by ID
  static async getById(table: string, id: string) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(`Error getting ${table} by ID:`, error)
        throw error
      }

      return data
    } catch (error) {
      console.error(`Exception getting ${table} by ID:`, error)
      throw error
    }
  }

  // Get all records from a table
  static async getAll(table: string, options?: {
    select?: string
    orderBy?: string
    ascending?: boolean
    limit?: number
  }) {
    try {
      let query = supabase.from(table).select(options?.select || '*')

      if (options?.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? true })
      }

      if (options?.limit) {
        query = query.limit(options.limit)
      }

      const { data, error } = await query

      if (error) {
        console.error(`Error getting all ${table}:`, error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error(`Exception getting all ${table}:`, error)
      throw error
    }
  }

  // Get records with custom query
  static async query(table: string, queryFn: (query: any) => any) {
    try {
      const baseQuery = supabase.from(table).select('*')
      const customQuery = queryFn(baseQuery)
      
      const { data, error } = await customQuery

      if (error) {
        console.error(`Error querying ${table}:`, error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error(`Exception querying ${table}:`, error)
      throw error
    }
  }

  // Upload file to storage
  static async uploadFile(bucket: string, path: string, file: File) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file)

      if (error) {
        console.error(`Error uploading file to ${bucket}:`, error)
        throw error
      }

      return data
    } catch (error) {
      console.error(`Exception uploading file to ${bucket}:`, error)
      throw error
    }
  }

  // Download file from storage
  static async downloadFile(bucket: string, path: string) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path)

      if (error) {
        console.error(`Error downloading file from ${bucket}:`, error)
        throw error
      }

      return data
    } catch (error) {
      console.error(`Exception downloading file from ${bucket}:`, error)
      throw error
    }
  }

  // Get public URL for a file
  static getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return data.publicUrl
  }

  // Delete file from storage
  static async deleteFile(bucket: string, path: string) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) {
        console.error(`Error deleting file from ${bucket}:`, error)
        throw error
      }

      return true
    } catch (error) {
      console.error(`Exception deleting file from ${bucket}:`, error)
      throw error
    }
  }
}

// Export shorthand functions for common operations
export const db = DatabaseService
