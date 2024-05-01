const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');


const ChatBox = (props) => {
    const [messages, setMessages] = useState(props.messages);

    useEffect(() => {
        const getMessages = () => {
            fetch('/getMessages')
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setMessages(data.messages);
                });
        };
        getMessages();
    }, []);

    console.log(messages);

    return (
        <div>
            <h1>Chat</h1>
            <p>Chat is working!</p>
            <input type="text" id="message" />
            <button onClick={(e) => handleMessage(e, props.triggerReload)}>Send</button>
        </div>
    );
};

const handleCard = (e, triggerReload) => {
    e.preventDefault();

    const name = document.getElementById('cardName').value;
    const attribute = document.getElementById('cardAttribute').value;
    const cardType = document.getElementById('cardType').value;
    const level = document.getElementById('cardLevel').value;
    const description = document.getElementById('cardEffect').value;
    const attack = document.getElementById('cardAtk').value;
    const defense = document.getElementById('cardDef').value;

    //tiny bit of hardcoded data but coould be worse
    //names are confusing
    const data = {
        name,
        type:"Monster",
        attribute,
        level,
        description,
        attack,
        defense,
        cardType,
        isPendulum: false,
    };

    helper.sendPost('/saveCard', data, triggerReload);
};

const CardHolder = (props) => {
    //I will understand this one day
    const [atk, setAtk] = useState(props.atk);
    const [def, setDef] = useState(props.def);
    const [name, setName] = useState(props.name);

    let effect;

    const cardStyle = {
        padding: "0px",
        margin: "0px",
        border: "0px",
        background: "transparent",
        position: "absolute",
        top: "0px",
        left: "0px",
        display: "block",
    }
    const headStyle = {
        position: "absolute",
        top: "20",
        left: "10",
    }
    return (
        <div id="card-display" style={{
            position: "relative",
            width: "694px",
            height: "1013px",
            right: "0px",
            top: "0px",
        }}>
            <div id="card" style={cardStyle}>
                <img src={props.base} />
                <div id="card-header" style={headStyle}>
                    <p>
                        <span style={{ position: "absolute", fontFamily:"title", fontSize:"4rem", left:9, bottom:22, color:'gold'}}>{name}</span>
                        <img src="/assets/yugioh-assets/yugioh-art/header.png" />
                        <img src={props.attribute} style={{ position: "absolute", right: "10", bottom: "23" }} />
                    </p>
                </div>
                <div id="card-type" style={{ position: "absolute", top: "115", left: "10", display:'flex', width:"600px", flexDirection:"row-reverse" }}>
                    <span style={{display:"inline-flex", padding:"2px"}}><img src="/assets/yugioh-assets/yugioh-art/star.png"/></span>
                    <span style={{display:"inline-flex", padding:"2px"}}><img src="/assets/yugioh-assets/yugioh-art/star.png"/></span>
                    <span style={{display:"inline-flex", padding:"2px"}}><img src="/assets/yugioh-assets/yugioh-art/star.png"/></span>
                    <span style={{display:"inline-flex", padding:"2px"}}><img src="/assets/yugioh-assets/yugioh-art/star.png"/></span>
                </div>
                <div id="card-art" style={{ position: "absolute", top: "150", left: "15" }}>
                    <img src="/assets/yugioh-assets/yugioh-art/art-box.png" />
                </div>
                <div id="card-effect" style={{ position: "absolute", top: "730", left: "10", fontFamily: "effect"}}>
                    <span style={{ position: "absolute", left: "14", top: "28" }}>Effect</span>
                    <p>
                        <div style={{width: "600px", height: "150px",position: "absolute", wordWrap:"unset", overflow:"hidden", top:"45"}}>
                            {effect}
                        </div>
                        
                        <img src="/assets/yugioh-assets/yugioh-art/Lore Border.png" style={{ position: "absolute", right: "-10", bottom: "7" }} />
                        <img src="/assets/yugioh-assets/yugioh-art/Lore Background.png" />
                        <div style={{ position: "absolute"}}>
                            <p id="atk" style={{ position: "absolute", bottom:0, left:425}}>
                                ATK/{atk}
                            </p>
                            <p id="def" style={{ position: "absolute", bottom:0, left:525}}>
                                DEF/{def}
                            </p>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    )
}

const CardForm = (props) => {
    return (<>
        <div id="cardMaker">
            <div id="name">
                <label for="cardName">Name:</label>
                <input type="text" id="cardName" onChange={document.querySelector}/>
            </div>
            <div id="type">
                <label for="cardType">Type:</label>
                <select type="select" id="cardType" onChange={document.querySelector}>
                    <option value="Main Deck">Effect</option>
                    <option value="Normal">Normal</option>
                    <option value="Fusion">Fusion</option>
                    <option value="Synchro">Synchro</option>
                    <option value="Ritual">Ritual</option>
                </select>
            </div>
            <div id="attribute">
                <label for="cardAttribute">Attribute:</label>
                <select type="select" id="cardAttribute">
                    <option value="dark">Dark</option>
                    <option value="divine">Divine</option>
                    <option value="earth">Earth</option>
                    <option value="fire">Fire</option>
                    <option value="light">Light</option>
                    <option value="water">Water</option>
                    <option value="wind">Wind</option>
                </select>
            </div>
            <div id="level">
                <label for="cardLevel">Level:</label>
                <input type="number" id="cardLevel" />
            </div>
            <div id="picture">
                <label for="cardPicture">Picture:</label>
                <input type="file" id="cardPicture" />
            </div>
            <div id="effect">
                <label for="cardEffect">Effect:</label>
                {/* why cant i get the values and put them in props */}
                <textarea id="cardEffect" onChange={document.querySelector}></textarea>
            </div>
            <div id="atk">
                <label for="cardAtk">ATK:</label>
                <input type="number" id="cardAtk" />
            </div>
            <div id="def">
                <label for="cardDef">DEF:</label>
                <input type="number" id="cardDef" />
            </div>
        </div>
        <button onClick={(e) => handleCard(e, props.triggerReload)}>Submit</button>
        <CardHolder
            base={`/assets/yugioh-assets/yugioh-art/fusion.png`}
            cardEffect={document.getElementById("cardEffect")}
            attribute="/assets/yugioh-assets/yugioh-art/dark.png"
            triggerReload={()=>{setReloadCard(!reloadCard)}}
        />
    </>
    )
}

const CardShower = (props) =>{
    const [cards, setCards] = useState(props.cards);

    useEffect(() => {
        const loadCardsFromServer = async () => {
            const response = await fetch('/getCards');
            const data = await response.json();
            setCards(data.cards);
        };
        loadCardsFromServer();
    }, [props.reloadCard])

    if (cards.length === 0) {
        return (
            <div>
                <h3>No created cards yet</h3>
            </div>
        );
    }

    //from domomaker
    const Cards = cards.map((card) => {
        return (
            <div key={card._id} style={{display:"flex"}}>
                <h3 className="Name" style={{padding: 5}}>Name: {card.name}</h3>
                <h3 className="Atk" style={{padding: 5}}>ATK: {card.attack}</h3>
                <h3 className="Def" style={{padding: 5}}>DEF: {card.defense}</h3>
                <button onClick={(e) => {alert(`pay $5 to get ${card.name} printed`)}}>Get {card.name} printed</button>
            </div>
        );
    });

    return (
        <div className="cardList">
            {Cards}
        </div>
    );
}


const App = () => {
    //from domomaker
    const [reloadCard, setReloadCard] = useState(false);
    return (
        <div>
            <h1>React App</h1>
            <p>React is working!</p>
            <CardForm triggerReload={()=>{setReloadCard(!reloadCard)}}/>
            <CardShower cards={[]} reloadCard={reloadCard} triggerReload={() => { setReloadCard(!reloadCard) }}/>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;