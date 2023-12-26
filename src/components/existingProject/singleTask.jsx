import React,{useEffect} from 'react'
import styled from "styled-components";

const Container = styled.div`
border-radius: 10px;
padding: 8px;
color: #000;
margin-bottom: 8px;
min-height: 90px;
margin-left: 10px;
margin-right: 10px;
background-color: red;
cursor: pointer;
display: flex;
justify-content: space-between;
flex-direction: column;
`;
const TextContent = styled.div;
const Icons = styled.div`
display: flex;
justify-content: end;
padding: 2px;
`;
export default function SingleTask({task}) {
  useEffect(() => {
    console.log(task);
    // Your code here
  }, []); //
  return (
      <Container>
    <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
<span>
<small>
#{task._id}
{" "}
</small>
</span>
</div>
<div
style={{ display: "flex", justifyContent: "center", padding: 2 }}
>
<TextContent>{task.title}</TextContent>
</div>

<Icons>
<div>
| <Avatar src={"https://joesch.moe/api/v1/random?key=" + task.id} />
</div>
</Icons>
</Container>

  )
}
