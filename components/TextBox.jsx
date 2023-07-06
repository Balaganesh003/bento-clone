import React, { useRef, useState } from 'react';
import ResizingContainer from './ResizingContainer';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/store/profile-slice';

const TextBox = ({ item }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [textareaValue, setTextareaValue] = useState(item.content); // Store textarea value separately

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };

  const textareaRef = useRef(null);

  const handleFocus = () => {
    if (textareaRef.current) {
      const lastLine = textareaRef.current.lastElementChild;
      if (lastLine) {
        // Scroll to the last line with smooth behavior
        lastLine.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }

      setTimeout(() => {
        textareaRef.current.focus();

        // Set cursor position at the end of the last line
        textareaRef.current.selectionStart = item?.content?.length;
        textareaRef.current.selectionEnd = item?.content?.length;
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        textareaRef.current.scrollLeft =
          textareaRef.current.scrollWidth - textareaRef.current.clientWidth;
      }, 0);
    }
  };

  const handleBlur = () => {
    if (textareaRef.current) {
      textareaRef.current.selectionStart = 0;
      textareaRef.current.selectionEnd = 0;
      // Scroll to the top
      textareaRef.current.scrollTop = 0;
      // Update the main value prop
    }
  };

  const handleChange = (e) => {
    setTextareaValue(e.target.value); // Update the separate textarea value
    dispatch(profileActions.updateItem({ ...item, content: e.target.value }));
  };

  return (
    <ResizingContainer
      width={width}
      height={height}
      item={item}
      type={'text'}
      handleResize={handleResize}>
      <div className="h-full w-full overflow-hidden p-2 group-hover:bg-[#f5f5f5] group rounded-lg">
        <textarea
          ref={textareaRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Add Note"
          onChange={handleChange}
          value={textareaValue} // Use the separate textarea value
          className={`w-full h-full  scrollbar-hide focus:outline-none group-hover:bg-[#f5f5f5] leading-snug resize-none rounded overflow-y-auto ${
            (height === 1 || height === 3) && 'line-clamp-5'
          } ${(height === 4 || height === 5) && 'line-clamp-[13]'} ${
            height === 2 && 'line-clamp-1 '
          }   text-[1.25rem] leading-[132%] focus:line-clamp-none`}
        />
      </div>
    </ResizingContainer>
  );
};

export default TextBox;
