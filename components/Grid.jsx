import React, { useState } from 'react';

const Grid = () => {
  const [grid, setGrid] = useState(
    Array(50).fill(Array(50).fill({ rowSpan: 1, colSpan: 1 }))
  );
  const [widgetCount, setWidgetCount] = useState(4);

  const handleWidgetResize = (row, col, rowSpan, colSpan) => {
    const updatedGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((colItem, colIndex) =>
        rowIndex === row && colIndex === col
          ? { rowSpan, colSpan }
          : { rowSpan: colItem.rowSpan, colSpan: colItem.colSpan }
      )
    );

    setGrid(updatedGrid);
  };

  const handleAddWidget = () => {
    setWidgetCount(widgetCount + 1);
  };

  return (
    <div className="grid grid-cols-50 gap-2">
      {grid.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`relative col-span-${col.colSpan} row-span-${col.rowSpan} bg-gray-300`}
            onMouseDown={() => handleWidgetResize(rowIndex, colIndex, 2, 2)}>
            {col.rowSpan === 1 && col.colSpan === 1 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span>Widget</span>
              </div>
            )}
            {col.rowSpan === 1 && col.colSpan === 1 && (
              <div className="absolute right-0 bottom-0 p-1">
                <div className="w-3 h-3 bg-gray-700 opacity-0 hover:opacity-100 cursor-pointer" />
              </div>
            )}
          </div>
        ))
      )}
      <div className="col-span-50">
        <button
          className="px-4 py-2 mt-4 bg-blue-500 text-white"
          onClick={handleAddWidget}>
          Add Widget
        </button>
      </div>
    </div>
  );
};

export default Grid;
