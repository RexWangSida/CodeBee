import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Dropzone = ({ isDropDisabled, heroes, id }) => (
  <div className="flex row-auto flex-row">
    <a className="hover:bg-indigo-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
      <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
        <div>
          <dt class="sr-only">Title</dt>
            <dd class="group-hover:text-white leading-6 font-medium text-black">
            <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu hero-list" {...provided.droppableProps} ref={provided.innerRef}>
            {heroes.map(({ name }, index) => (
              <Hero key={name} name={name} index={index} />
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

const Hero = ({ name, index }) => (
  <Draggable key={name} draggableId={name} index={index}>
    {provided => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="tile-content">{name}</div>
        </div>
      );
    }}
  </Draggable>
);

export default Dropzone;