import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      // 1) delete item on source.index
      copyToDos.splice(source.index, 1);
      // 2) Put back the item on the destination.index
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };
  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          <Droppable droppableId="one">
            {(provider) => (
              <Board ref={provider.innerRef} {...provider.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} index={index} toDo={toDo} />
                ))}
                {provider.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
