import { useState } from 'react';
import './App.css';
import { Question } from './Question';

const askQuestions = [
	new Question("Is this person able to give or do what I want?", "Capability"),
	new Question("Is getting my objective more important than my relationship with this person?", "Priority"),
	new Question("Will asking help me feel competent and self-respecting?", "Self-Respect"),
	new Question("Is the person required by law or moral code to do or give me what I want?", "Rights"),
	new Question("Am I responsibile for telling the person what to do?", "Authority"),
	new Question("Is what I want appropriate for this relationship? (Is it right to ask for what I want?)", "Relationship"),
	new Question("Is asking important to a long-term goal?", "Long-Term Goals"),
	new Question("Do I give as much as I get with this person?", "Fairness"),
	new Question("Do I know what I want and have the facts I need to support my request?", "Homework"),
	new Question("Is this a good time to ask? (Is the person in the right mood?)", "Timing")
];

const sayNoQuestions = [
	new Question("Can I give the person what is wanted?", "Capability"),
	new Question("Is my relationship with the person more important than getting my objective?", "Priority"),
	new Question("Will saying no make me feel bad about myself?", "Self-Respect"),
	new Question("Am I required by law or moral code to give or do what is wanted, or does saying no violate this person's rights?", "Rights"),
	new Question("Is the person responsible for telling me what to do?", "Authority"),
	new Question("Is what is wanted appropriate for this relationship? (Is it right to say no?)", "Relationship"),
	new Question("In the long term, will I regret saying no?", "Long-Term Goals"),
	new Question("Do I owe this person a favor? (Does the person do a lot for me?)", "Fairness"),
	new Question("Do I know what I am saying no to? (Is the other person clear about what is wanted?)", "Homework"),
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
	"Don't do it"
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

function App() {
	const [mode, setMode] = useState<boolean | undefined>(undefined)
	const [score, setScore] = useState(0);
	const [questionIndex, setQuestionIndex] = useState(0);

	if (mode === undefined) {
		//display types
		return (
			<>
				<h1>Dime Game</h1>
				<div className="card">
					<button onClick={() => setMode(true)}>Decide how strongly to ask</button>
					<button onClick={() => setMode(false)}>Decide how strongly to say no</button>
				</div>
			</>
		)
	}
	else {

		const questions = mode ? askQuestions : sayNoQuestions;
		const actions = mode ? askActionsByScore : noActionsByScore;

		if (questionIndex < questions.length) {
			return (
				<>
					<h1>Dime Game</h1>
					<div className="card">
						<h2>{questionType[mode ? 0 : 1]}</h2>
						<h3>{questions[questionIndex].question}</h3>
						<button onClick={() => { setScore(score + 1); setQuestionIndex(questionIndex + 1); }}>Yes</button>
						<button onClick={() => { setQuestionIndex(questionIndex + 1); }}>No</button>
					</div>
				</>
			)
		}
		else {
			return (
				<>
					<h1>Dime Game</h1>
					<div className="card">
						<h2>Score: {score * 10}¢</h2>
						<h3>Action to take:</h3>
						<h2 style={{ color: colorsByIndex[score] }}>{actions[score]}</h2>
						<button onClick={() => { setMode(undefined); setScore(0); setQuestionIndex(0); }}>Start Over</button>
					</div>
				</>
			)
		}
	}
}

export default App
