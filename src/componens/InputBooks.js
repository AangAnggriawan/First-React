import { getInitialData } from "../utils";
import { Card as FlowbiteCard } from "flowbite-react";
import React, { useState } from "react";
import Navigasi from "./Navigasi";
const uuid = require("uuid");

function BooksInput(props) {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [allBooksData, setAllBooksData] = useState(getInitialData()); // State untuk menyimpan semua data buku

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!judul || !isi) {
      alert("Judul dan isi buku harus diisi!");
      return;
    }

    const existingData = getInitialData();

    const newData = {
      archived: false,
      body: isi,
      createdAt: new Date().toISOString(),
      id: uuid.v4(),
      title: judul,
    };

    const updatedBooksData = [...allBooksData, newData];
    setAllBooksData(updatedBooksData);
    setJudul("");
    setIsi("");
  };

  function Button(props) {
    const [buttonText] = useState(props.label);
    const [backgroundColor] = useState(props.bg);

    const onClickBtnDelete = () => {
      props.onDeleteBtn(props.index);
    };

    const onClickBtnArsip = () => {
      props.onArsip(props.index);
    };

    return (
      <button
        className={backgroundColor}
        onClick={props.label === "Delete" ? onClickBtnDelete : onClickBtnArsip}
      >
        {buttonText}
      </button>
    );
  }

  const [arsip, setArsip] = useState([]);

  const handleDelete = (index) => {
    const newItems = [...allBooksData];
    newItems.splice(index, 1);
    setAllBooksData(newItems);
  };

  const handleArsip = (index) => {
    const arsipItem = allBooksData[index];
    const newItems = [...allBooksData];
    newItems.splice(index, 1);
    setAllBooksData(newItems);
    setArsip((prevArsip) => [...prevArsip, arsipItem]);
  };

  const handleDeleteArsip = (index) => {
    const newItems = [...arsip];
    newItems.splice(index, 1);
    setArsip(newItems);
  };
  const handleKembaliArsip = (index) => {
    const KembaliItem = arsip[index];
    const newItems = [...arsip];
    newItems.splice(index, 1);
    setArsip(newItems);
    setAllBooksData((prevArsip) => [...prevArsip, KembaliItem]);
  };
  const Card = ({ index, item }) => (
    <div key={index} className="flex">
      <FlowbiteCard className="max-w-xs">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item.body}
        </p>
        <div className="flex gap-2 justify-center">
          <Button
            index={index}
            label="Delete"
            bg="bg-red-500 text-white rounded-lg w-1/2 py-2"
            onDeleteBtn={handleDelete}
          />
          <Button
            index={index}
            label="Arsip"
            bg="bg-green-500 text-white rounded-lg w-1/2 py-2"
            onArsip={handleArsip}
          />
        </div>
      </FlowbiteCard>
    </div>
  );
  return (
    <>
      <Navigasi />
      <form
        className="flex max-w-md flex-col gap-4 mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-white">Buat Catatan</h1>
        <div className="flex flex-col justify-center gap-3">
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="bg-slate-700 border-white border rounded-lg py-2 px-2 outline-none text-white"
            placeholder="Judul"
          />
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            className="bg-slate-700 border-white border rounded-lg py-2 px-2 outline-none text-white h-52"
            style={{ resize: "none" }}
            rows={4}
            cols={50}
            placeholder="Masukkan teks Anda di sini..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-3 rounded-lg font-bold"
        >
          Buat Buku
        </button>
      </form>
      <br />
      <div className="flex flex-wrap gap-3 justify-center py-4">
        {allBooksData.map((item, index) => (
          <Card key={index} index={index} item={item} />
        ))}
      </div>
      <h1 className="text-2xl text-white text-center">Arsip Books</h1>
      <div className="flex flex-wrap gap-3 justify-center py-4">
        {arsip.map((arsipItem, arsipIndex) => (
          <div key={arsipIndex} className="flex">
            <FlowbiteCard className="max-w-xs">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {arsipItem.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {arsipItem.body}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  index={arsipIndex}
                  onArsip={() => handleDeleteArsip(arsipIndex)}
                  label="Hapus"
                  bg="bg-red-500 text-white rounded-lg w-1/2 py-2"
                />
                <Button
                  index={arsipIndex}
                  label="Kembali"
                  bg="bg-blue-500 text-white rounded-lg w-1/2 py-2"
                  onArsip={() => handleKembaliArsip(arsipIndex)}
                />
              </div>
            </FlowbiteCard>
          </div>
        ))}
      </div>
    </>
  );
}

export default BooksInput;
