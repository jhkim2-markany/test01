import React, {useState, useEffect} from "react";
import events from './events';
import { Calendar, momentLocalizer, Views, DateLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/ko'
import _ from 'lodash'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'


import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

moment.locale("ko")


const DragAndDropCalendar = withDragAndDrop(Calendar)

// -------------------------------------------------
function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      <p>{event.desc && ' : ' + event.desc}</p>  
    </span>
  )           //마우스 오버하기
}

//Agenda에서 이벤트 주는거
function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  )
}

function App(props) {

  const [Events, setEvents] = useState(events)
  const [dayLayoutAlgorithm, setdayLayoutAlgorithm] = useState('no-overlap')
  const [displayDragItemInCell, setdisplayDragItemInCell] = useState(true)


  
  const handleSelect = ({ start, end }) => {
    const title = window.prompt('일정을 추가하세요')
    const desc = window.prompt("내용을 추가하세요")
//     if (title)
//     setEvents([...Events, {start,end,title,desc}])
// }

    if (title)
      setEvents(events => [...events,{start,end,title,desc}])
    }


  const localizer = momentLocalizer(moment)
  return (
    <>
      <h1>일정관리</h1>
        <DragAndDropCalendar
          
          style={{ height: 800 ,width: '100%' }}
          popup={true}                            //popup 만들어주는거 넘어갓을 때
          selectable={true}                              //**선택할수 있게 만들어줌
          localizer={localizer}                                     //moment 모듈을 이용한 로컬화
          events={Events}                               //이벤트 나오게 하는거
          defaultView={Views.MONTH}                                  //디폴트 뷰
          scrollToTime={new Date()}                               //**스크롤 시작 위치를 정해줌(안해줘도 될듯)
          defaultDate={moment().toDate()}                           //디폴트 날짜
          onSelectSlot={handleSelect}                          //**날짜 선택시 콜백이 발생한다 -> 위에서 만들어준 handleSelect가 실행
          dayLayoutAlgorithm={dayLayoutAlgorithm}        //레이아웃 배열의 알고리즘
          
        //   onEventDrop={this.moveEvent}
        //   onEventResize={this.resizeEvent}
        // // onDragStart={console.log}                                //콘솔로그 찍히는거 드래그 시작할 떄
        // //   dragFromOutsideItem={
        // //   this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
        // // }
        // onDropFromOutside={this.onDropFromOutside}
        // handleDragStart={this.handleDragStart}             
        // tooltipAccessor={this.state.events.start}                 //작동안됌
        // onDoubleClickEvent = { event => this.onSelectEvent(event) } //**날자 말고 일정 더블클릭으로 업데이트 해보기      

        components={{
        events: Event,   //여기서 호버줘야함
        agenda: {
          event: EventAgenda,
        },
      }}
        />
    </>
  );
};

export default App;
