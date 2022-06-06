import { useState } from 'react';
import { useEffect } from 'react';
import './App.scss';
import LoadingBox from './loadingbox/LoadingBox';
import { Transition } from 'react-transition-group';



const colors=[
        "#16a085",
        "#27ae60",
        "#2c3e50" ,
        " #f39c12" ,
        " #e74c3c" ,
         "#9b59b6" ,
         "#FB6964" ,
         "#342224" ,
         "#472E32" ,
         "#BDBB99" ,
         "#77B1A9" ,
         "#73A857" ,
      ]
      
      const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 1 },
      };
      
        const defaultStyle = {
                opacity: 0,
        };

      
      function App() {
        const [data, setData] = useState(null)
        const [loading,setLoading] = useState(true)

        

        
        const [currentQuote, setcurrentQuote] = useState("The most difficult thing is the decision to act, the rest is merely tenacity. ")
        const [currentAuthor, setcurrentAuthor] = useState("Johann Wolfgang von Goethe")
        const [currentColor, setcurrentColor] = useState(colors[Math.floor(Math.random()*colors.length)])
        const [inProp, setInProp] = useState(true);


        useEffect(() => {
                fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
                        .then(response =>{ if (response.ok) {
                                                                return response.json()
                                                        }
                                                        else{
                                                                throw response
                                                        }
                                        } )     
                        .then(data => setData(data))
                        .then(()=>setLoading(false))

        },[])

      

        const handleClick=()=>{
                setInProp(!inProp)
                let randquote= data.quotes[Math.floor(Math.random()*data.quotes.length)]
                setcurrentQuote( randquote.quote)
                setcurrentAuthor (randquote.author)
                setcurrentColor(colors[Math.floor(Math.random()*colors.length)])

        }
        // console.log(cssStyle)

  return (
    <div className ="App" style={{backgroundColor:currentColor}}>
        <div id="wrapper">
                <div id="quote-box"> 
               {
                       loading?<LoadingBox/>
                       :
                       <>
                       
                       <Transition in={inProp} timeout={200}>
                                {
                                        (state) => (
                                                <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                                                        <div className="quote-text"  >
                                                                <i className="fa-solid fa-quote-left" style={{color:currentColor}}></i>
                                                                <span id="text" style={{color:currentColor}}>&nbsp;{currentQuote}&nbsp;</span>
                                                                <i className="fa-solid fa-quote-right" style={{color:currentColor}}></i>
                                                        </div>   
                                                        <div className="quote-author" style={{color:currentColor}}>
                                                                - 
                                                                <span id="author" style={{color:currentColor}}> {currentAuthor}</span>
                                                        </div>

                                                </div> 
                                        )
                                }
                        </Transition>
                               
                                
                        <div className="buttons">
                                <div>
                                        <a 
                                                href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)}`}
                                                id="tweet-quote"
                                                title="Tweet this quote!"
                                                target="_blank"
                                                rel="noreferrer"
                                        >
                                        <i className="fa-brands fa-twitter-square" style={{color:currentColor,marginRight:"3px"}}></i>
                                        </a>
                                        <a 
                                                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(currentAuthor)}&content=${encodeURIComponent(currentQuote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button `}
                                                id="tumblr-quote"
                                                title="Post this quote on tumblr!"
                                                target="_blank"
                                                rel="noreferrer"
                                                >
                                                <i className="fa-brands  fa-tumblr-square" style={{color:currentColor}}></i>
                                        </a>
                                </div>
                                
                                <button className="button" id="new-quote" onClick={handleClick} style={{background:currentColor}}>
                                        New quote
                                </button>
                        </div>
                
                
                </>
        }
                </div>
                <div className="footer"> Made by    
                <a href="https://github.com/ogooluwanick"         rel="noreferrer"             target="_blank"> Ogoooluwanick
                </a>
                </div>
        </div>
    </div>
  );
}

export default App;
