export const deleteCollectionItem = async (generatedId: string, userId: string, image_path:string) => {
    try {
      const res = await fetch('/api/collections/deleteCollection', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({generatedId, userId, image_path }),
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete the item');
      }
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while deleting the item');
    }
  };