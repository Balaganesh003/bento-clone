import React, { useRef, useState } from 'react';
import ResizingContainer from './ResizingContainer';

const TextBox = () => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };

  const [value, setValue] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elitRepellat delectus sequi modi velit distinctio fugit ipsam ipsa animi id excepturi iste ratione ex officiis deserunt blanditiis, repellendus,et cupiditate. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis consequatur, vero adipisci nesciunt aspernatur ipsam eum at maiores tenetur. Accusantium, repellendus quisquam ut optio numquam mollitia repellat placeat ab voluptate?'
  );

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
        textareaRef.current.selectionStart = value.length;
        textareaRef.current.selectionEnd = value.length;
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
    }
  };

  return (
    <ResizingContainer
      width={width}
      height={height}
      handleResize={handleResize}>
      <div className="h-full w-full overflow-hidden p-2 group-hover:bg-gray-200 group rounded-lg">
        <textarea
          ref={textareaRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className={`w-full h-full  scrollbar-hide focus:outline-none group-hover:bg-gray-200 leading-snug resize-none rounded overflow-y-auto ${
            (height === 1 || height === 3) && 'line-clamp-5'
          } ${(height === 4 || height === 5) && 'line-clamp-[13]'} ${
            height === 2 && 'line-clamp-1 '
          }   text-[1.25rem] leading-[135%] focus:line-clamp-none`}
        />
      </div>
    </ResizingContainer>
  );
};

export default TextBox;
