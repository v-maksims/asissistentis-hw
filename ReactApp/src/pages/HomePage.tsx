/* eslint-disable max-len */
import style from '../styles/HomePage.module.scss';

export default function HomePage () {
    const abilities = ['HTML5', 'CSS', 'JavaSript', 'TypeScript', 'JS Query', 'React', 'NodeJS', 'Express', 'MySQL', 'MongoDB', 'Docker'];

    return (
        <>
            <h1 className={style.mainTitle}>Homework for &apos;Assistentis&apos;</h1>
            <div className={style.mainWrap}>
                <div className={style.authorWrap}>
                    <span className={style.secondaryTitle}>
                    Author of the work:
                    </span>
                    <span>
                    Maksims Veiserts
                    </span>
                </div>
                <span className={style.secondaryTitle}>
                    A little bit about the author of the work:
                </span>
                <ul className={style.ulWrap}>
                    <li>
                        21 years old
                    </li>
                    <li>
                        Graduated from the Jelgava Technical School with a degree in computer technician
                    </li>
                    <li>
                        Open to new knowledge
                    </li>
                </ul>
                <span className={style.secondaryTitle}>Ability to work with:</span>
                <ul className={style.ulWrap}>
                    {abilities.map((ability, i) => <li key={i}> {ability} </li>)}
                </ul>
            </div>
        </>
    );
}
