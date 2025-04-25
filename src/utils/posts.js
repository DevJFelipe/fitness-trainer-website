import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsDirectory = path.join(__dirname, '../../posts');

export function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      // Eliminar ".md" del nombre del archivo para obtener el id
      const id = fileName.replace(/\.md$/, '');

      // Leer el archivo markdown como string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Usar gray-matter para parsear la metadata del post
      const matterResult = matter(fileContents);

      // Importar la imagen dinámicamente
      const imageUrl = new URL(matterResult.data.image, import.meta.url).href;

      return {
        id,
        content: matterResult.content,
        ...matterResult.data,
        image: imageUrl
      };
    });

    // Ordenar posts por fecha
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export function getPostById(id) {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const imageUrl = new URL(matterResult.data.image, import.meta.url).href;

    return {
      id,
      content: matterResult.content,
      ...matterResult.data,
      image: imageUrl
    };
  } catch (error) {
    console.error(`Error loading post ${id}:`, error);
    return null;
  }
} 