import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import { axiosWithToken } from '@/utils/axiosjwt';
import { useSelector } from 'react-redux';

const ResizingContainer = ({
  children,
  width,
  height,
  handleResize,
  type,
  item,
  isSearchOpen,
  setIsSearchOpen,
  USERNAME,
}) => {
  const dispatch = useDispatch();

  const { isSameUser } = useSelector((state) => state.ui);
  const handelDelete = async () => {
    try {
      if (item.type === 'socialLink') {
        // Dispatch action to update social links
        dispatch(
          profileActions.updateSocialLinks({
            ...item,
            isAdded: false,
            userName: '',
          })
        );
      }

      // Make an axios DELETE request to delete the profile object
      const response = await axiosWithToken.delete(
        `http://localhost:5000/profile/${USERNAME}/${item.id}`
      );

      // Dispatch action to remove the item from state upon successful deletion
      dispatch(profileActions.removeItem(item.id));

      // Handle response status if needed (e.g., log success message)
      console.log('Profile object deleted successfully:', response.data);
    } catch (error) {
      // Handle errors from dispatching actions or API request
      console.error('Error deleting profile object:', error);

      // Optionally dispatch an action to handle error state (e.g., show error message)
      // dispatch(profileActions.handleError(error));

      // If necessary, rollback any state changes or notify the user of the error
      // dispatch(profileActions.rollbackChanges());

      // Handle specific error scenarios based on error.response.status or error.message
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
        // Optionally dispatch an action based on specific server errors
        // dispatch(profileActions.handleServerError(error.response.data));
      } else if (error.message === 'Network Error') {
        // Handle network-related errors
        console.error(
          'Network error occurred. Please check your internet connection.'
        );
        // Optionally dispatch an action to notify the user
        // dispatch(profileActions.handleNetworkError());
      } else {
        // Handle other types of errors
        console.error('An unexpected error occurred:', error.message);
        // Optionally dispatch an action to handle unexpected errors
        // dispatch(profileActions.handleUnexpectedError());
      }
    }
  };

  return (
    <div className="relative flex-1 group">
      <div
        className={`${
          width === 2 || width === 3 || width === 5
            ? 'xs:w-[377px] xl:w-[388px] w-[calc(100vw-2rem)]'
            : 'xs:w-[175px] w-[calc(100vw/2-2rem)]'
        } ${
          (height === 1 || height === 3) &&
          'h-[calc(100vw/2-2rem)] xs:h-[175px] '
        } ${
          (height === 4 || height === 5) &&
          'h-[calc(100vw-2rem)] xs:h-[377px] xl:h-[388px]'
        } ${
          height === 2 && ' h-[65px]'
        } bg-white relative rounded-[24px] border ${
          type == 'text' && 'p-3'
        } shadow-lg transition-all duration-500 group `}>
        {children}
        {/* Delete options */}
      </div>
      {isSameUser && (
        <div
          onClick={handelDelete}
          className="absolute hidden group-hover:flex  items-center justify-center -top-4 -left-4 w-9 h-9 rounded-full bg-white shadow-lg  cursor-pointer hover:bg-gray-100">
          <AiOutlineDelete className="w-5 h-5 text-black" />
        </div>
      )}

      {/* Resizing options */}

      {isSameUser && (
        <div
          className={`absolute hidden bottom-[-30px] group-hover:flex  w-fit left-[50%] -translate-x-1/2 bg-black shadow-lg rounded-[8px] transition-all duration-300 items-center p-2 gap-2 z-10`}>
          <div
            onClick={() => handleResize(1, 1)}
            className={`w-7 h-7 ${
              width === 1 && height === 1 ? 'bg-white' : 'bg-black'
            } flex items-center justify-center rounded cursor-pointer`}>
            <div
              className={`h-3 w-3 border-[2px] ${
                width === 1 && height === 1 ? 'border-black' : 'border-white'
              } rounded-[2px]`}></div>
          </div>
          <div
            onClick={() => handleResize(2, 2)}
            className={`w-7 h-7 ${
              width === 2 && height === 2 ? 'bg-white' : 'bg-black'
            } flex items-center justify-center rounded cursor-pointer`}>
            <div
              className={`w-5 h-2 border-[2px] ${
                width === 2 && height === 2 ? 'border-black' : 'border-white'
              } rounded-[2px]`}></div>
          </div>
          <div
            onClick={() => handleResize(3, 3)}
            className={`w-7 h-7 ${
              width === 3 && height === 3 ? 'bg-white' : 'bg-black'
            } flex items-center justify-center rounded cursor-pointer`}>
            <div
              className={`w-5 h-3 border-[2px] ${
                width === 3 && height === 3 ? 'border-black' : 'border-white'
              } rounded-[2px]`}></div>
          </div>
          <div
            onClick={() => handleResize(4, 4)}
            className={`w-7 h-7 ${
              width === 4 && height === 4 ? 'bg-white' : 'bg-black'
            } flex items-center justify-center rounded cursor-pointer`}>
            <div
              className={`h-5 border-[2px] w-2 ${
                width === 4 && height === 4 ? 'border-black' : 'border-white'
              } rounded-[2px]`}></div>
          </div>
          <div
            onClick={() => handleResize(5, 5)}
            className={`w-7 h-7 ${
              width === 5 && height === 5 ? 'bg-white' : 'bg-black'
            } flex items-center justify-center rounded cursor-pointer`}>
            <div
              className={`h-5 w-5 border-[2px] ${
                width === 5 && height === 5 ? 'border-black' : 'border-white'
              } rounded`}></div>
          </div>
          {type == 'map' && (
            <div
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`w-7 h-7 ${
                isSearchOpen ? 'bg-white' : 'bg-black'
              } flex items-center justify-center rounded cursor-pointer`}>
              <BiSearch
                className={`w-6 h-6   ${
                  isSearchOpen ? 'text-black' : 'text-white'
                }`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResizingContainer;
