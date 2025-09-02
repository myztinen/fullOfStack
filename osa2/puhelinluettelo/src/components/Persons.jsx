const Persons = ({persons, nameFilter}) => {
    return (
        <div>
            {persons.filter(person => person.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase())).map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}
export default Persons