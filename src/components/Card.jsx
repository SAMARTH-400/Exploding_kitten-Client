import DefuseCard from '../components/DefuseCard';
import BombCard from '../components/BombCard';
import CatCard from '../components/CatCard';
import ShuffleCard from '../components/ShuffleCard';

function Card({cardType}) {
    switch (cardType) {
        case 'cat': return <CatCard />;
        case 'defuse': return <DefuseCard />;
        case 'shuffle': return <ShuffleCard />;
        case 'explode': return <BombCard />;
        default: return null;
    };
}

export default Card;