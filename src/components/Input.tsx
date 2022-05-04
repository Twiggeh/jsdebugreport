import styled from '@emotion/styled';
import { motion, transform, Transition, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const Input = () => {
	const maxLength = 22;

	const [count, setCount] = useState(0);
	const charsRemaining = maxLength - count;

	const controls = useAnimation();

	useEffect(() => {
		controls.start({ scale: 0.8 });
		return controls.stop;
	}, []);

	const colors = transform([maxLength / 4, 0], ['#ccc', '#ff008c']);

	useEffect(() => {
		if (maxLength / 2 < charsRemaining) return;

		const range = [0, maxLength / 4];
		const velocity = transform(range, [100, 0])(charsRemaining);
		const duration = transform(range, [0.1, 0.4])(charsRemaining);
		const startScale = transform(range, [2, 1.4])(charsRemaining);
		const finalScale = transform([...range, maxLength], [1.6, 0.8, 0.8])(charsRemaining);

		const startTrans: Transition = {
			velocity,
			type: 'spring',
			stiffness: 700,
			damping: 80,
			duration,
		};

		const finalTrans: Transition = {
			duration,
		};

		(async () => {
			await controls.start({ scale: startScale }, startTrans);
			await controls.start({ scale: finalScale }, finalTrans);
		})();

		return controls.stop;
	}, [maxLength, charsRemaining]);

	return (
		<InputWrap>
			<StyledInput onChange={e => setCount(e.target.value.length)} />
			<Counter animate={controls} style={{ color: colors(charsRemaining) }}>
				{charsRemaining}
			</Counter>
		</InputWrap>
	);
};

const InputWrap = styled(motion.div)`
	position: relative;
	display: inline-block;
	color: white;
`;

const Counter = styled(motion.p)`
	font-size: 2em;
	position: absolute;
	bottom: calc(50% - calc(1em / 2));
	right: 5%;
`;

const StyledInput = styled(motion.input)`
	font-size: 2em;
	padding: 1em;
	background: transparent;
`;

export default Input;
