function Navigasi() {
  return (
    <nav className="bg-slate-700 py-2 border-b border-white flex justify-between items-center px-2">
      <h1 className="text-white font-bold text-2xl">Books</h1>
      <form>
        <input
          type="text"
          placeholder="Cari Catatan..."
          className="border pl-2 py-2 rounded-lg w-80 outline-none shadow-lg border-white"
        />
      </form>
    </nav>
  );
}

export default Navigasi;
