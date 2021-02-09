import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Dropzone = ({ isDropDisabled, blocks, id, pos }) => (
  <div className={pos + " dropzone flex row-auto flex-row"}>
    <a style={{width: "100%"}}className="hover:bg-indigo-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
      <dl className="grid sm:block lg:grid xl:block items-center" style={{ height: "100%" }}>
        <div style={{ height: "100%" }}>
          <dd className="group-hover:text-white leading-6 font-medium text-black" style={{ height: "100%" }} >
            <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu block-list " {...provided.droppableProps} style={{height: "100%"}} ref={provided.innerRef}>
            {blocks.map(({ name }, index) => (
              <Block key={name} name={name} index={index}/>
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
    </dd>
        </div>
      </dl>
    </a>
  </div>
);

const Block = ({ name, index }) => (
  <Draggable key={name} draggableId={name} index={index}>
    {provided => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="tile-content" style={{margin: "auto", maxWidth: "100px"}}>{name}</div>
        </div>
      );
    }}
  </Draggable>
);

export default Dropzone;