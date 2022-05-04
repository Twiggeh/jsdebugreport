import { useEffect, useState } from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import {
	BoundingBox,
	motion,
	TargetAndTransition,
	useMotionValue,
	useTransform,
	Variants,
} from 'framer-motion';
import { cssReset } from './static/themes';
import { Listings } from './components/Listings';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import Input from './components/Input';
import Cards from './components/Cards/Cards';

const App = () => {
	const animation: TargetAndTransition = {
		x: -100,
	};
	const dragConstraint: Partial<BoundingBox> = { left: -100, right: 100 };

	const list: Variants = { hidden: { opacity: 0.4 }, visible: { opacity: 1 } };
	const item: Variants = {
		hidden: { x: -10, opacity: 0.4 },
		visible: { x: -10, opacity: 1 },
	};

	const x = useMotionValue(0);
	const opacity = useTransform(x, [-100, 0, 100], [0.3, 1, 0.3]);

	const background = useTransform(
		x,
		[-100, 0, 100],
		['#ff008c', '#7700ff', 'rgb(230, 255, 0)']
	);

	const [open, setOpen] = useState(false);
	const [starPeople, setStarPeople] = useState<{ name: string }[]>([]);

	useEffect(() => {
		(async () => {
			const res = await fetch('https://swapi.dev/api/people', { method: 'GET' });
			const result = await res.json();

			setStarPeople(result.results);
		})();
	}, []);

	return (
		<BrowserRouter>
			<Global styles={cssReset} />
			<Body>
				<button onClick={() => setOpen(!open)}>Open</button>
				<Nav animate='hidden'>
					<NavLink
						drag='x'
						style={{ x, opacity, background }}
						dragConstraints={dragConstraint}
						animate={open ? 'visible' : 'hidden'}
						initial='hidden'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						variants={item}>
						<Link to='/listings'>Listings</Link>
					</NavLink>
					<NavLink>
						<Link to='/input'>Input Field</Link>
					</NavLink>
					<NavLink>
						<Link to='/cards'>Cards</Link>
					</NavLink>
				</Nav>
				<Content>
					<Routes>
						<Route path='listings' element={<Listings />} />
						<Route path='input' element={<Input />} />
						<Route path='cards' element={<Cards />} />
					</Routes>
					{starPeople.map((el, i) => (
						<div key={el.name + i}>{el?.name}</div>
					))}
				</Content>
			</Body>
		</BrowserRouter>
	);
};

const NavLink = styled(motion.li)`
	color: white;
	cursor: pointer;
`;

const Nav = styled(motion.nav)`
	border-block-end: 1px white solid;
	display: flex;
	gap: 1em;
	justify-content: flex-end;
	padding: 1em;
	font-size: 2em;
`;

const Body = styled.div`
	height: 100%;
	min-height: 100vh;
	background: black;
`;

const Content = styled(motion.div)`
	color: white;
`;

export default App;

// TODO: read how AnimatePresence works
