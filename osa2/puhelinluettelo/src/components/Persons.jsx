const Persons = ({persons, nameFilter, removeHandler}) => {
    return (
        <div>
            {persons.filter(person => person.name.toLocaleLowerCase()
                .includes(nameFilter.toLocaleLowerCase()))
                .map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => removeHandler(person.id)}>delete</button></div>)}
        </div>
    )
}
export default Persons