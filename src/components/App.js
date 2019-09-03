import React,{Component} from 'react';
let randomHex = () => {
      //var letters = 'BCDEF'.split('');
	  var letters='0123456789'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;				
}
const getRandomInt=function(max){
	return Math.floor(Math.random()*Math.floor(max));
}
const randomClr=randomHex();

	
class App extends Component{
 constructor(props){
	super(props);
	this.state={
		quotes:[],
		quote :'',
		author :''
	}
	this.handleQuoteChange=this.handleQuoteChange.bind(this);
	
	document.body.style.backgroundColor=randomClr;
	
	
 }
 handleQuoteChange(){
	let randomClr=randomHex();
	document.body.style.backgroundColor=randomClr;
	document.getElementById('myBlockQuote').style.color=randomClr;
	document.getElementById('new-quote').style.backgroundColor=randomClr;
	document.getElementById('icon-twitter').style.color=randomClr;
	
	
	const index=getRandomInt(this.state.quotes.length);
	this.setState({
		quote:this.state.quotes[index].quote,
		author:this.state.quotes[index].author,
			
	})
 }
 componentWillMount() {
    fetch('../../quotes.json').then((resp)=> resp.json().then(response=>{
		const index=getRandomInt(response.quotes.length);
		 this.setState({
			quotes:response.quotes,
			quote:response.quotes[index].quote,
			author:response.quotes[index].author,
			
		 })
		 document.getElementById('myBlockQuote').style.color=randomClr;
	     document.getElementById('new-quote').style.backgroundColor=randomClr;
		 document.getElementById('icon-twitter').style.color=randomClr;
	}))
  }
  componentDidMount() {
    setTimeout( () => {
      
    },1500);
  }
  render(){
    return(
	 <div id="quote-box">
	        <blockquote id="myBlockQuote">
			  <div id="text">{this.state.quote}</div>
			  <cite>
			    <div id="author">- {this.state.author}</div>
			  </cite>
			   
			</blockquote>
	        <div id="action">
			   
			     <Tweet tweet={encodeURI(
                   "?hashtags=quotes&related=freeCodeCamp&text=".concat(this.state.quote) .concat(" ").concat(this.state.author))} />
			  
			  
			    <button id="new-quote" onClick={this.handleQuoteChange}>New quote</button>
			  
		     
			 </div>
	        
			
     
	   </div>
	 );
   }
}

const Tweet = props => {
  return (
  <a id="tweet-quote"
      className="button"
      href={"https://www.twitter.com/intent/tweet".concat(props.tweet)}
      target="_blank"
      >
      <i id="icon-twitter" className="fab fa-twitter" />
    </a>
  );
};

export default App;
