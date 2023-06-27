import Image from 'next/image';
import { useState } from 'react';
import TextBox from '@/components/TextBox';
import { Inter } from 'next/font/google';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const inter = Inter({
  subsets: ['latin'],
});

export default function Home() {
  const [textBox1, setTextBox1] = useState(
    'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?'
  );
  const [textBox2, setTextBox2] = useState(
    'sssssssssssssssssssssssssssssssssssssssssssssssssssss'
  );
  const [textBox3, setTextBox3] = useState(
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  );

  const contentList = [
    {
      id: 1,
      content: <TextBox value={textBox1} setValue={setTextBox1} />,
    },
    {
      id: 2,
      content: <TextBox value={textBox2} setValue={setTextBox2} />,
    },
    {
      id: 3,
      content: <TextBox value={textBox3} setValue={setTextBox3} />,
    },
    {
      id: 3,
      content: <TextBox value={textBox3} setValue={setTextBox3} />,
    },
  ];

  const onDragEnd = (result) => {
    console.log(result);
  };

  return (
    <main className={` ${inter.className} p-[4rem] flex`}>
      <div className="bg-gray-500 flex-1 mr-[5rem] h-fit min-h-[calc(100vh-8rem)]">
        <h1>Balaganesh</h1>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided) => (
            <div
              {...provided.droppableProps}
              {...provided.innerRef}
              className="flex flex-wrap w-full  max-w-[820px] h-full gap-[40px]">
              {contentList.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={`draggable-${item.id}`}
                  index={index}>
                  {(provided) => (
                    <div
                      className="h-fit"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}>
                      <div>{item.content}</div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
