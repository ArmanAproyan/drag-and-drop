import { DragEvent, useState } from 'react'
import './style.css'
import SortCard from '../sortCard/SortCard'
import { Cards } from '../../type/types'

const DragingBlock = () => {



    const [cards, setCards] = useState<Cards[]>([
        { id: 1, title: 'Карточка 1' },
        { id: 2, title: 'Карточка 2' },
        { id: 3, title: 'Карточка 3' },
        { id: 4, title: 'Карточка 4' },
    ]);



    const [currentCard, setCurrentCard] = useState<Cards | null>(null);

    const handleSorting = (): void => {

        const sortingCards = [...cards].sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            return 0
        });

        setCards(sortingCards);
    };


    const dragStarting = (e: DragEvent<HTMLDivElement>, card: Cards): void => {
        setCurrentCard(card);
    }

    const dragLeaving = (e: DragEvent<HTMLDivElement>): void => {
        e.currentTarget.style.boxShadow = 'none';
    }

    const dragEnding = (e: DragEvent<HTMLDivElement>): void => {
        e.currentTarget.style.boxShadow = 'none';
    }

    const dragOvering = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault()
        e.currentTarget.style.boxShadow = '5px 5px 2px 1px #354F52';
    }

    const droping = (e: DragEvent<HTMLDivElement>, card: Cards): void => {
        e.currentTarget.style.boxShadow = 'none'

        e.preventDefault()
        if (currentCard) {
            const startIndex = cards.findIndex((val) => val.id == currentCard.id)
            const dropIndex = cards.findIndex((val) => val.id == card.id)

            const swapCards = cards;
            //swap cards
            [swapCards[startIndex], swapCards[dropIndex]] = [swapCards[dropIndex], swapCards[startIndex]]

            setCards(swapCards)
        }
        setCurrentCard(null)
    }

    return (
        <>
            <div draggable={true} className='draging_block'>
                {cards.map((val, index) => {
                    return (
                        <div
                            draggable={true}
                            key={val.id}
                            onDragStart={(e: DragEvent<HTMLDivElement>) => dragStarting(e, val)}
                            onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaving(e)}
                            onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEnding(e)}
                            onDragOver={(e: DragEvent<HTMLDivElement>) => dragOvering(e)}
                            onDrop={(e: DragEvent<HTMLDivElement>) => droping(e, val)}
                            className='card'>
                            <span>{val.title}</span>
                        </div>
                    )
                })}

            </div>
            <div className="button_block">
                <SortCard sorting={handleSorting} />
            </div>
        </>
    )
}

export default DragingBlock
