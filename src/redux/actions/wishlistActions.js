export const addToWishlist = (product, userId) => async dispatch => {
    try {
        const response = await axios.post(`${server}/api/wishlist/user/${userId}/add`, product);
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: response.data,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const removeFromWishlist = (productId, userId) => async dispatch => {
    try {
        const response = await axios.delete(`${server}/api/wishlist/user/${userId}/remove`, { data: { productId } });
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: productId,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};