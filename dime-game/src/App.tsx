import { useState } from 'react';
import './App.css';
import { Question } from './Question';

const askQuestions = [
	new Question("Is this person able to give or do what I want?", "Capability"),
	new Question("Is getting my objective more important than my relationship with this person?", "Priority"),
	new Question("Will asking help me feel competent and self-respecting?", "Self-Respect"),
	new Question("Is the person required by law or moral code to do or give me what I want?", "Rights"),
	new Question("Am I responsible for telling the person what to do?", "Authority"),
	new Question("Is what I want appropriate for this relationship? (Is it right to ask for what I want?)", "Relationship"),
	new Question("Is asking important to a long-term goal?", "Long-Term Goals"),
	new Question("Do I give as much as I get with this person?", "Fairness"),
	new Question("Do I know what I want and have the facts I need to support my request?", "Homework"),
	new Question("Is this a good time to ask? (Is the person in the right mood?)", "Timing")
];

const sayNoQuestions = [
	new Question("Can I give the person what is wanted?", "Capability"),
	new Question("Is my relationship with the person more important than getting my objective?", "Priority"),
	new Question("Will saying no make me feel bad about myself, in wise mind?", "Self-Respect"),
	new Question("Am I required by law or moral code to give or do what is wanted, or does saying no violate this person's rights?", "Rights"),
	new Question("Is the person responsible for telling me what to do?", "Authority"),
	new Question("In my opinion, is what is wanted appropriate for this relationship? (Is it right to say no?)", "Relationship"),
	new Question("In the long term, will I regret saying no. Wise mind thinking?", "Long-Term Goals"),
	new Question("Do I owe this person a favor? (Does the person do a lot for me?)", "Fairness"),
	new Question("Do I know what I am saying no to? (Is the other person clear about what is wanted? Need to clarify what they are asking, and the scope. No assumptions.)", "Homework"),
	new Question("Is this a good time to say no? (Is the person in the right mood?)", "Timing")
];

const askActionsByScore = [
	"Don't ask; don't hint",
	"Don't ask; don't hint",
	"Hint indirectly; take no",
	"Hint openly; take no",
	"Ask tentatively; take no",
	"Ask gracefully; take no",
	"Ask confidently; take no",
	"Ask confidently; resist no",
	"Ask firmly; resist no",
	"Ask firmly; insist; negotiate; keep trying",
	"Don't take no for an answer"
];

const noActionsByScore = [
	"Do it without being asked",
	"Do it without being asked",
	"Don't complain; do it cheerfully",
	"Do it, even if you are not cheerful about it",
	"Do it, but let the person know you are not happy",
	"Say you'd rather not, but do it gracefully",
	"Say no firmly, but reconsider",
	"Say confidently, resist saying yes",
	"Say no firmly, resist saying yes",
	"Say no firmly, resist, negotiate",
	"Say no and don't do it"
];

const colorsByIndex = [
	"#ff0000",
	"#ff0000",
	"#fc4700",
	"#f46900",
	"#e68600",
	"#d79f00",
	"#c5b400",
	"#b0c800",
	"#96db00",
	"#6bee00",
	"#04ff00"
];


const questionType = ["Decide how strongly to ask", "Decide how strongly to say no"];

const VOICE = "Google UK English Male";
function App() {
	const [mode, setMode] = useState<boolean | undefined>(undefined)
	const [score, setScore] = useState(0);
	const [questionIndex, setQuestionIndex] = useState(0);

	//get voices
	const voices = window.speechSynthesis.getVoices();
	const voiceToUse = voices.find(v => v.name === VOICE) || null;

	function playSound(text: string) {
		const msg = new SpeechSynthesisUtterance(text);
		msg.voice = voiceToUse;
		msg.rate = 1.05;
		msg.pitch = 0.9;
		window.speechSynthesis.speak(msg);
	}

	function stopPlay() {
		window.speechSynthesis.cancel();
	}

	let lastIndex = localStorage.getItem("lastIndex") ? parseInt(localStorage.getItem("lastIndex")!) : 0;
	let playedResult = localStorage.getItem("playedResult") ? localStorage.getItem("playedResult") === "true" : false;
	let introPlayed = localStorage.getItem("introPlayed") ? localStorage.getItem("introPlayed") === "true" : false;
	if (mode === undefined) {
		if (!introPlayed) {
			playSound('Welcome to the Dime Game. Please choose whether you want to ask or say no.')
			localStorage.setItem("introPlayed", "true");
		}
		else {
			localStorage.setItem("introPlayed", "false");
		}

		//display types
		return (
			<>
				<h1>Dime Game</h1>
				<div className="card">
					<button onClick={() => { setMode(true); playSound("You chose how strongly to ask") }}>Decide how strongly to ask</button>
					<button onClick={() => { setMode(false); playSound("You chose how strongly to say no") }}>Decide how strongly to say no</button>
				</div>
			</>
		)
	}
	else {

		const questions = mode ? askQuestions : sayNoQuestions;
		const actions = mode ? askActionsByScore : noActionsByScore;


		if (questionIndex < questions.length) {
			if (lastIndex !== questionIndex)
				playSound(questions[questionIndex].question)
			localStorage.setItem("lastIndex", questionIndex.toString());
			return (
				<>
					<h1>Dime Game</h1>
					<div className="card">
						<h2>{questionType[mode ? 0 : 1]}</h2>
						<h3>{questions[questionIndex].question} <span style={{ cursor: 'pointer' }} onClick={(_) => playSound(questions[questionIndex].question)}>🔊</span></h3>
						<button style={{ marginRight: "10px" }}
							onClick={() => { setScore(score + 1); setQuestionIndex(questionIndex + 1); stopPlay(); playSound("You chose Yes") }}>Yes</button>
						<button onClick={() => { setQuestionIndex(questionIndex + 1); stopPlay(); playSound("You chose No") }}>No</button>
					</div>
				</>
			)
		}
		else {
			const answer = `Action recommended for you: ${actions[score]}. Make sure to check with your wise mind before acting according to recommendation.`
			if (!playedResult) {
				playSound(answer)
				localStorage.setItem("playedResult", "true");
			}
			else
				localStorage.setItem("playedResult", "false");

			return (
				<>
					<h1>Dime Game</h1>
					<div className="card">
						<h2>Score: {score * 10}¢</h2>
						<h3>Action to take:</h3>
						<h2 style={{ color: colorsByIndex[score] }}>{actions[score]}
							<span style={{ cursor: 'pointer' }} onClick={(_) => playSound(answer)}>🔊</span>
						</h2>
						<h3>Make sure to check with your wise mind before acting according to recommendation.</h3>
						<button onClick={() => { setMode(undefined); setScore(0); setQuestionIndex(0); playSound('Starting Over') }}>Start Over</button>
					</div>
				</>
			)
		}
	}
}

export default App
