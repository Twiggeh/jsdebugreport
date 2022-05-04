import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import a from '../../static/images/a.jpg';
import b from '../../static/images/b.jpg';
import c from '../../static/images/c.jpg';
import d from '../../static/images/d.jpg';
import e from '../../static/images/e.jpg';
import f from '../../static/images/f.jpg';
import g from '../../static/images/g.jpg';
import h from '../../static/images/h.jpg';

const lorem =
	'Lorem ipsum odor amet, consectetuer adipiscing elit. Magnis proin natoque diam aenean. Leo rhoncus posuere netus fusce maximus quis.';

const cardData = [
	{ image: a, title: 'Image A', description: lorem },
	{ image: b, title: 'Image B', description: lorem },
	{ image: c, title: 'Image C', description: lorem },
	{ image: d, title: 'Image D', description: lorem },
	{ image: e, title: 'Image E', description: lorem },
	{ image: f, title: 'Image F', description: lorem },
	{ image: g, title: 'Image G', description: lorem },
	{ image: h, title: 'Image H', description: lorem },
];

const Cards = () => {
	const [selected, setSelected] = useState<string | undefined>();

	return (
		<CardWrapper>
			<h1>Images</h1>
			<CardContainer>
				{cardData.map(props => (
					<Card
						{...props}
						selected={selected}
						setSelected={setSelected}
						key={props.title}
					/>
				))}
			</CardContainer>
		</CardWrapper>
	);
};

const CardWrapper = styled(motion.div)`
	padding: 2em;
`;

type ICard = {
	title: string;
	image: string;
	description: string;
	selected: string | undefined;
	setSelected: Dispatch<SetStateAction<string | undefined>>;
};

const Card = ({ title, image, description, selected, setSelected }: ICard) => {
	const isSelected = selected === title;

	return (
		<StyledCard onClick={() => setSelected(selected === title ? undefined : title)}>
			<Title>{title}</Title>
			<img src={image}></img>
			{isSelected && <Description>{description}</Description>}
		</StyledCard>
	);
};

const StyledCard = styled(motion.li)`
	border-radius: 2em;
	overflow: hidden;
	position: relative;
	background: green;
	box-sizing: border-box;
`;

const CardContainer = styled(motion.ul)`
	display: grid;
	overflow: hidden;
	grid-template-columns: repeat(2, 30em);
	grid-auto-rows: 30em;
	justify-content: space-between;
	box-sizing: border-box;
	gap: 4em;
	img {
		width: 100%;
	}
`;

const Description = styled(motion.div)`
	color: white;
`;

const Title = styled(motion.h2)`
	font-weight: bold;
	font-size: 2em;
	color: white;
	position: absolute;
	margin: 0.5em;
`;

export default Cards;
