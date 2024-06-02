export default function Home(props){
    return (
        <div className="container">
            Home
            <p>
                {props.email}{' '}
                {props.password}{' '}
                {props.firstName}{' '}
                {props.lastName}{' '}
            </p>
        </div>
    )
}