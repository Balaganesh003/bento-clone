import Image from 'next/image';
import { useState } from 'react';
import TextBox from '@/components/TextBox';
import { Inter } from 'next/font/google';
import { resetServerContext } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const inter = Inter({
  subsets: ['latin'],
});

export default function Home({ data }) {
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
      id: '11111111111',
      content: <TextBox value={textBox1} setValue={setTextBox1} />,
    },
    {
      id: '22222222222222222',
      content: <TextBox value={textBox2} setValue={setTextBox2} />,
    },
    {
      id: '333333333333333333333333',
      content: <TextBox value={textBox3} setValue={setTextBox3} />,
    },
  ];

  const [content, setContent] = useState(contentList);

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type == 'group') {
      const newContentList = Array.from(contentList);
      const [removed] = newContentList.splice(source.index, 1);
      newContentList.splice(destination.index, 0, removed);

      console.log(newContentList);
      setContent(newContentList);
    }
  };

  return (
    <main className={` ${inter.className} p-[4rem] flex`}>
      <div className="bg-gray-500 flex-1 mr-[5rem] h-fit w-full min-h-[calc(100vh-8rem)]">
        <h1>Balaganesh</h1>
      </div>
      <div className="max-w-[820px] w-[820px] min-h-[calc(100vh-8rem)]">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="flex gap-[40px] flex-wrap">
                  {content.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}>
                          <div>{item.content}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </main>
  );
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext();

  return { props: { data: [] } };
};
