import { useState, useMemo } from 'react'
import Select from 'react-select';
import { useMutation } from '@apollo/client'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'



const UpdateBorn = (props) => {
  const [selectValue, setSelectValue] = useState(null)
  const [born, setBorn] = useState('')


  const [ editBorn ] = useMutation(EDIT_BORN,{ 
    refetchQueries: [ { query: ALL_AUTHORS } 
     ]})

  const submit = async (event) => {
    event.preventDefault()
    const bornInt = Number(born)
    editBorn({variables: {name:selectValue.value, setBornTo:bornInt}})

  }

  const options = useMemo(
    () => props.authors.map(item => ({ value: item.name, label: item.name })),
    [props.authors]
  )

  const onChangeAuthor = (opt) => {
    setSelectValue(opt);
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select options={options} value={selectValue} onChange={onChangeAuthor} isClearable isSearchable/>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default UpdateBorn