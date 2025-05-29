// src/services/unifiedContentService.js
import { contenidoService } from './contenidoService'
import { posts as staticPosts } from '../data/posts'

export const unifiedContentService = {
  // Obtener todo el contenido (estático + base de datos)
  async getAllContent() {
    try {
      // Obtener contenido de la base de datos
      const dbResult = await contenidoService.getAllContenidos()
      const dbContent = dbResult.success ? dbResult.data : []

      // Convertir posts estáticos al formato de la base de datos para uniformidad
      const staticContent = staticPosts.map(post => ({
        id_contenido: `static_${post.id}`,
        titulo: post.title,
        descripcion: post.excerpt,
        contenido: post.content,
        imagen_url: post.image,
        tipo: 'blog',
        tema: post.category,
        visibilidad: 'publico',
        fecha_creacion: post.date,
        fecha_publicacion: post.date,
        es_estatico: true, // Marcar como contenido estático
        autor: {
          nombre: 'Sistema'
        },
        usuario: {
          nombre: 'Sistema'
        }
      }))

      // Combinar ambos tipos de contenido
      const allContent = [...dbContent, ...staticContent]

      return {
        success: true,
        data: allContent,
        stats: {
          total: allContent.length,
          database: dbContent.length,
          static: staticContent.length,
          published: allContent.filter(c => c.visibilidad === 'publico').length,
          drafts: allContent.filter(c => c.visibilidad === 'borrador').length,
          blog: allContent.filter(c => c.tipo === 'blog').length,
          exercises: allContent.filter(c => c.tipo === 'ejercicio').length,
          routines: allContent.filter(c => c.tipo === 'rutina').length
        }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message,
        data: []
      }
    }
  },

  // Obtener contenido por ID (maneja tanto estático como de BD)
  async getContentById(id) {
    try {
      if (id.startsWith('static_')) {
        // Es contenido estático
        const staticId = id.replace('static_', '')
        const staticPost = staticPosts.find(post => post.id === staticId)
        
        if (!staticPost) {
          return { success: false, error: 'Contenido estático no encontrado' }
        }

        return {
          success: true,
          data: {
            id_contenido: id,
            titulo: staticPost.title,
            descripcion: staticPost.excerpt,
            contenido: staticPost.content,
            imagen_url: staticPost.image,
            tipo: 'blog',
            tema: staticPost.category,
            visibilidad: 'publico',
            fecha_creacion: staticPost.date,
            fecha_publicacion: staticPost.date,
            es_estatico: true,
            autor: { nombre: 'Sistema' }
          }
        }
      } else {
        // Es contenido de base de datos
        return await contenidoService.getContenidoById(id)
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Crear nuevo contenido (solo en base de datos)
  async createContent(contentData) {
    return await contenidoService.createContenido(contentData)
  },

  // Actualizar contenido (solo de base de datos)
  async updateContent(id, contentData) {
    if (id.startsWith('static_')) {
      return { 
        success: false, 
        error: 'No se puede editar contenido estático desde el panel de administración' 
      }
    }
    return await contenidoService.updateContenido(id, contentData)
  },

  // Eliminar contenido (solo de base de datos)
  async deleteContent(id) {
    if (id.startsWith('static_')) {
      return { 
        success: false, 
        error: 'No se puede eliminar contenido estático desde el panel de administración' 
      }
    }
    return await contenidoService.deleteContenido(id)
  },

  // Migrar posts estáticos a la base de datos
  async migrateStaticPosts() {
    try {
      const results = []
      
      for (const post of staticPosts) {
        const contentData = {
          titulo: post.title,
          descripcion: post.excerpt,
          contenido: post.content,
          imagen_url: post.image,
          tipo: 'blog',
          tema: post.category,
          visibilidad: 'publico',
          fecha_publicacion: post.date
        }
        
        const result = await contenidoService.createContenido(contentData)
        results.push({
          staticId: post.id,
          success: result.success,
          error: result.error,
          newId: result.data?.id_contenido
        })
      }
      
      return { success: true, results }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
