import Button from '../components/tools/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Persons = () => {
  const [content, setContent] = useState(<PersonsList showForm={showForm} />);

  function showList() {
    setContent(<PersonsList showForm={showForm} />);
  }
  function showForm(person) {
    setContent(<PersonsForm person={person} showList={showList} />);
  }

  return (
    <div className="container my-5 flex flex-col gap-6 items-center justify-center">
      {content}
    </div>
  );
};

export default Persons;

function PersonsList(props) {
  const [person, setPerson] = useState([]);
  function fetchPerson() {
    axios
      .get('http://localhost:3004/persons')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Server is not response');
        }
        return res.data;
      })
      .then((data) => {
        setPerson(data);
      })
      .catch((error) => console.log('Error:', error));
  }

  useEffect(() => fetchPerson(), []);

  // function deleteProduct(id) {
  //   fetch('http://localhost:3004/persons/' + id, {
  //     method: 'DELETE',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => fetchPerson());
  // }

  function deletePerson(id) {
    axios
      .delete('http://localhost:3004/persons/' + id)
      .then((res) => res.data)
      .then((data) => fetchPerson());
  }
  return (
    <>
      <h2 className="font-bold text-3xl">List Of Persons</h2>
      <div className="flex gap-4">
        <Button onClick={() => props.showForm({})} color="green">
          Create
        </Button>
        <button
          onClick={() => fetchPerson()}
          className="text-green-950 bg-white border-2 border-green-800 rounded
        p-1 hover:bg-green-800 hover:text-white"
        >
          Refresh
        </button>
      </div>
      <div className="flex items-center justify-center mt-4">
        <table className="table-fixed border-collapse border border-slate-400 rounded-md">
          <thead>
            <tr>
              <th className="border border-slate-300 shadow p-4">Name</th>
              <th className="border border-slate-300 shadow p-4">Last Name</th>
              <th className="border border-slate-300 shadow p-4">Age</th>
              <th className="border border-slate-300 shadow p-4">Email</th>
              <th className="border border-slate-300 shadow p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {person?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-300 shadow p-4">
                    {item.name}
                  </td>
                  <td className="border border-slate-300 shadow p-4">
                    {item.lastName}
                  </td>
                  <td className="border border-slate-300 shadow p-4">
                    {item.age}
                  </td>
                  <td className="border border-slate-300 shadow p-4">
                    {item.email}
                  </td>
                  <td className="flex gap-2 border border-slate-300 shadow p-4">
                    <Button onClick={() => props.showForm(item)} color="green">
                      Edit
                    </Button>
                    <Button onClick={() => deletePerson(item.id)} color="red">
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PersonsForm(props) {
  const [errorMessage, setErrorMessage] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    ///reading form data
    const formData = new FormData(e.target);

    ////convert formData to object
    const person = Object.fromEntries(formData.entries());

    ///validate form
    if (!person.name || !person.lastName || !person.age || !person.email) {
      console.log('please enter all fields');
      setErrorMessage(
        <div>
          <p className="text-red-600 text-lg">please enter all fields!</p>
        </div>
      );
      return;
    }

    ///editing items

    if (props.person.id) {
      axios
        .patch('http://localhost:3004/persons/' + props.person.id, person, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Server is not response');
          }
          return res.data;
        })
        .then((data) => props.showList())
        .catch((error) => console.log('Error:', error));
    } else {
      ///adding items of list
      axios
        .post('http://localhost:3004/persons', person, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Server is not response');
          }
          return res.data;
        })
        .then((data) => props.showList())
        .catch((error) => console.log('Error:', error));
    }
    // fetch('http://localhost:3004/persons', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(person),
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error('Server is not response');
    //     }
    //     return res.json();
    //   })
    //   .then((data) => props.showList())
    //   .catch((error) => console.log('Error:', error));
  }
  return (
    <>
      <h2 className="font-bold text-3xl">
        {props.person.id ? 'Edit person info' : 'Add New Person'}
        {/* Add New Person */}
      </h2>
      {errorMessage}
      <div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="w-full max-w-sm"
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Name:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                defaultValue={props.person.name}
                name="name"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Last Name:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                name="lastName"
                defaultValue={props.person.lastName}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Age:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                name="age"
                defaultValue={props.person.age}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                name="email"
                defaultValue={props.person.email}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <div className="flex justify-between md:flex md:items-center">
                <button
                  className="bg-blue-800 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  onClick={() => props.showList()}
                  color="red"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
