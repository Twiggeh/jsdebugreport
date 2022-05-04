import styled from '@emotion/styled';
import { Variants, AnimatePresence, motion } from 'framer-motion';
import { useState, Fragment } from 'react';

const ids = [1, 2, 3, 4, 5];

export const Listings = () => {
	return ids.map(i => <Listing key={i} id={i}></Listing>);
};

const ListingVariants: Variants = {
	open: { background: '#7700ff' },
	closed: { background: '#FF0088' },
};

const DescriptionVariants: Variants = {
	open: { opacity: 1, scale: 1, height: '200px' },
	closed: { opacity: 0, scale: 0.5, height: 0 },
};

const Listing = ({ id }: { id: number }) => {
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<StyledListing
				onClick={() => setOpen(!open)}
				animate={open ? 'open' : 'closed'}
				variants={ListingVariants}
			/>
			<AnimatePresence>
				{open && (
					<ListingDescription
						key={`content${id}`}
						initial='closed'
						animate='open'
						exit='closed'
						variants={DescriptionVariants}
						transition={{
							duration: 0.8,
							ease: [0.04, 0.62, 0.23, 0.98],
						}}
					/>
				)}
			</AnimatePresence>
		</Fragment>
	);
};

const ListingDescription = styled(motion.div)`
	height: 200px;
	background: #7700ff;
`;

const StyledListing = styled(motion.div)`
	height: 50px;
	margin-block: 1em;
`;
