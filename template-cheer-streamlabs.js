if (!window.typeWrite) {
	window.typeWrite = ({
		textElementsArr = [],
		durationMs = 1000,
		delayMs = 0,
		callback = () => { }
	}) => {
		const store = [];
		textElementsArr.forEach(el => {
			const textAsArr = el.innerText.split('');
			textAsArr.forEach(character => store.push({ el, character }));
			el.innerText = '';
		});

		const itvl = Math.round(durationMs / store.length);
		setTimeout(() => {
			let current = 0;
			const typeItvl = setInterval(() => {
				store[current].el.innerText = store[current].el.innerText + store[current].character;
				current++;

				if (current >= store.length) {
					clearInterval(typeItvl);
					callback();
				}
			}, itvl);
		}, delayMs);
	};
}

if (!window.DLBitsEffect) {
	window.DLBitsEffect = (durationMs = 1000) => {
		const dlBarEl = document.querySelector('#js-dl-bar');
		const bitsCounterEl = document.querySelector('#js-bits-counter');

		const nbBits = parseInt(bitsCounterEl.innerText);
		window.animateValue({
			el: bitsCounterEl,
			progressBarEl: dlBarEl,
			endValue: nbBits,
			durationMs: 1500,
			callback: () => {
				setTimeout(() => {
					const msgBoxEl = document.querySelector('#js-alert');
					msgBoxEl.classList.add('completed');
				}, 1000);
			}
		});
	};
}

if (!window.animateValue) {
	window.animateValue = ({
		el,
		progressBarEl,
		startValue = 0,
		endValue,
		durationMs = 1000,
		callback = () => { }
	}) => {
		let startTimestamp = null;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
			const val = Math.floor(progress * (endValue - startValue) + startValue);
			el.innerHTML = val;
			window.setProgressBarValue({
				el: progressBarEl,
				currentValue: val,
				totalValue: endValue
			});
			if (progress < 1)
				window.requestAnimationFrame(step);
			else
				callback();
		};
		window.requestAnimationFrame(step);
	};
}

if (!window.setProgressBarValue) {
	window.setProgressBarValue = ({ el, currentValue, totalValue }) => {
		const current = Math.floor(currentValue / totalValue * 10);
		el.innerText = '';
		for (let i = 0; i < 10; i++) {
			let char = '░';
			if (i <= current)
				char = '▓';
			el.innerText = el.innerText + char;
		}
	};
}

if (!window.startBitsAlert) {
	window.startBitsAlert = () => {
		const msgBoxEl = document.querySelector('#js-alert');
		const textElements = document.querySelectorAll('.js-typewriting');
		window.typeWrite({
			textElementsArr: textElements,
			durationMs: 1000,
			delayMs: 1250,
			callback: () => {
				setTimeout(() => {
					msgBoxEl.classList.add('loaded');
					window.DLBitsEffect(1500);
				}, 150);
			}
		});
	};
}

window.startBitsAlert();
