const workList = document.querySelector('#work_list')
const formElem = document.forms[0];
const workedElem = document.querySelector('#worked');
const ignoreElem = document.querySelector('#ignore');
const workedSpan = workedElem.querySelector('span');
const ignoreSpan = ignoreElem.querySelector('span');


let lst = [];


let workedNum = localStorage.getItem('workedNum');
let ignoreNum = localStorage.getItem('ignoreNum');


if(localStorage.getItem('workedNum') != null ){
	workedNum = localStorage.getItem('workedNum');
}else{
	workedNum = 0;
};

if(localStorage.getItem('ignoreNum') != null ){
	ignoreNum = localStorage.getItem('ignoreNum');
}else{
	ignoreNum = 0;
};


workedSpan.innerText = ` ${workedNum}`;
ignoreSpan.innerText = ` ${ignoreNum}`;


function render(wrkElem) {
	workList.innerText = '';
	for (let elem of wrkElem){
		const workCard = document.createElement('div');
		const descriptCard = document.createElement('div');
		const nameCard = document.createElement('p');
		const noteCard = document.createElement('p');
		const statusCard = document.createElement('div');
		const doneElem = document.createElement('div');
		const canceledElem = document.createElement('div');

		descriptCard.classList.add('description');
		statusCard.classList.add('statusCard');
		doneElem.classList.add('done');
		canceledElem.classList.add('canceled');

		descriptCard.append(nameCard, noteCard);
		statusCard.append(doneElem, canceledElem);
		workCard.append(descriptCard, statusCard);
		workList.append(workCard);

		doneElem.innerText = 'V';
		canceledElem.innerText = 'X';


		localStorage.setItem('workedNum', workedNum);
		localStorage.setItem('ignoreNum', ignoreNum);

		nameCard.innerText = elem.name;
		noteCard.innerText = elem.notes;

		localStorage.setItem('lst', JSON.stringify(lst));

		doneElem.addEventListener('click', event=> {
			event.preventDefault()
			lst = lst.filter(card => (card.name === elem.name && card.notes === elem.notes)? card.name !== elem.name : lst)
			workedNum = ++workedNum
			workedSpan.innerText = ` ${workedNum}`;
			localStorage.setItem('workedNum', workedNum);
			render(lst)
			localStorage.setItem('lst', JSON.stringify(lst))
		});

		canceledElem.addEventListener('click', event=> {
			event.preventDefault()
			lst = lst.filter(card => (card.name === elem.name && card.notes === elem.notes)? card.name !== elem.name : lst)
			ignoreNum = ++ignoreNum
			ignoreSpan.innerText = ` ${ignoreNum}`;
			localStorage.setItem('ignoreNum', ignoreNum);
			render(lst)
			localStorage.setItem('lst', JSON.stringify(lst))
		});
	}
}

addEventListener('submit', event=>{
	event.preventDefault()
	if (formElem.title.value !== '') {
		lst.push({
			name: formElem.title.value,
			notes: formElem.notes.value
		});
		render(lst)
	}else{
		return
	};
});
render(JSON.parse(localStorage.getItem('lst')));