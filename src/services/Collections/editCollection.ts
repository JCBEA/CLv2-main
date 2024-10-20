export const editCollectionItem = async (generatedId: string, userId: string, updatedData: any) => {
    try {
      const response = await fetch(`/api/collections/editCollection`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          updatedData,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error editing the collection item:', error);
      throw error;
    }
  };
  