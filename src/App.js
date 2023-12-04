// React 라이브러리와 Component 클래스를 import합니다.
import React, { Component } from "react";

// 다른 컴포넌트들을 import합니다.
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

// 이미지 파일들을 import합니다.
import 로고 from "./img/로고.png";
import 살라 from "./img/살라.png";
import 아놀드 from "./img/아놀드.png";
import 반데이크 from "./img/반데이크.png";
import 소보슬러이 from "./img/소보슬러이.png";


// App 클래스를 정의합니다. Component를 상속받습니다.
class App extends Component {
  // constructor를 통해 컴포넌트의 초기 상태를 설정합니다.
  constructor(props) {
    super(props); // Component 클래스의 생성자를 호출합니다.
    this.max_content_id = 4;
    this.state = {
      mode: "welcome", // 현재 모드를 'welcome'으로 설정합니다.
      selected_content_id: 0, // 선택된 content의 id를 0으로 초기화합니다.
      subject: { title: "리버풀 FC", sub: "리버풀 선수 소개 페이지입니다." }, // 상단 제목에 대한 정보를 객체로 설정합니다.
      welcome: { title: "안녕하세요", desc: "여기는 리버풀입니다.", image: 로고 }, // 환영 메시지와 이미지를 객체로 설정합니다.
      contents: [
        // 컨텐츠의 배열을 설정합니다. 각 항목은 id, title, desc, image 속성을 갖습니다.
        {
          id: 1,
          title: "살라",
          desc: "살라는 리버풀 역사상 EPL 최다득점자입니다. 이집트 국적의 리버풀 FC 소속 축구 선수. 포지션은 윙어. 현재 이집트 축구 국가대표팀의 주장을 맡고 있다. AS 로마에서 2017년에 리버풀로 이적하여 프리미어 리그와 UCL 우승을 이끌었으며, PL 득점왕 3회와 도움왕 1회, PFA 올해의 선수를 2회 수상하고 FIFA 올해의 선수 및 UEFA 올해의 선수 3위에 이름을 올렸다. 또한 리버풀 역사상 프리미어리그 최다 득점자이자, 최다 득점왕 수상자다.",
          image: 살라,
        },
        { id: 2, title: "아놀드", desc: "아놀드는 리버풀 EPL 수비수 통산 도움 2위입니다.", image: 아놀드 },
        {
          id: 3,
          title: "반데이크",
          desc: "반데이크는 발롱도르 2위였습니다.",
          image: 반데이크,
        },
        { id: 4, title: "소보슬러이", desc: "넥스트 제라드라고 불리는 선수입니다.", image: 소보슬러이 },
      ],
    };
  }

  getReadContent() {
    var i = 0;
      // contents 배열을 순회하여 선택된 content의 정보를 찾습니다.
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title,
      _desc,
      _image,
      _article = null;
    // 현재 모드에 따라서 title, desc, image를 결정합니다.
    if (this.state.mode === "welcome") {
      // 모드가 'welcome'일 때
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _image = this.state.welcome.image;
      _article = (<ReadContent title={_title} desc={_desc} img={_image}></ReadContent>);
    } else if (this.state.mode === "read") {
      // 모드가 'read'일 때
      var _content = this.getReadContent()
      
      _article = (<ReadContent title={_content.title} desc={_content.desc} img={_content.image}></ReadContent>);
    } else if (this.state.mode === "create"){
      _article = (<CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat({
          id: this.max_content_id,
          title: _title,
          desc: _desc,
          image: "",
      });
        this.setState({contents: _contents});
      }.bind(this)}></CreateContent>);
    } else if (this.state.mode === "update") {
      var _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({ contents: _contents, mode: "read" });
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }

  // render 함수는 컴포넌트가 화면에 렌더링될 때 호출됩니다.
  render() {
    // 최종적으로 렌더링될 JSX를 return합니다.
    return (
      <div className="App">
        {/* Subject 컴포넌트는 웹사이트의 제목 부분을 렌더링합니다. */}
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" }); // 클릭 시 mode를 'welcome'으로 설정합니다.
          }.bind(this)}
        ></Subject>
        {/* TOC 컴포넌트는 Table of Contents를 렌더링합니다. */}
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read", // 클릭 시 mode를 'read'로 설정합니다.
              selected_content_id: Number(id), // 선택된 컨텐츠의 id를 설정합니다.
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("really?")) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({ mode: "welcome", contents: _contents });
                alert("deleted!");
              }
            } else {
              this.setState({ mode: _mode });
            }
          }.bind(this)}
        ></Control>
        {/* Content 컴포넌트는 선택된 컨텐츠의 내용과 이미지를 렌더링합니다. */}
        {this.getContent()}
      </div>
    );
  }
}

// App 컴포넌트를 export합니다. 다른 파일에서 App 컴포넌트를 사용할 수 있게 됩니다.
export default App;
