
import React, { useState } from "react";

const PackingForm = ({ onSubmit }) => {
  const [container, setContainer] = useState({ length: 100, width: 100, height: 100 });
  const [boxes, setBoxes] = useState([{ id: "Box1", length: 20, width: 20, height: 20, quantity: 1 }]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedBoxes = [...boxes];
    updatedBoxes[index][name] = name === "id" ? value : parseInt(value);
    setBoxes(updatedBoxes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/pack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ container, boxes }),
    });
    const data = await response.json();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold border-b pb-2">Container Dimensions (cm)</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(container).map((dim) => (
          <div key={dim} className="flex flex-col">
            <label className="text-sm font-medium mb-1 capitalize">{dim}</label>
            <input
              type="number"
              name={dim}
              value={container[dim]}
              onChange={(e) => setContainer({ ...container, [dim]: parseInt(e.target.value) })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold border-b pb-2">Boxes</h2>
      {boxes.map((box, index) => (
        <div key={index} className="grid grid-cols-5 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              name="id"
              value={box.id}
              onChange={(e) => handleChange(e, index)}
              placeholder="ID"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {["length", "width", "height", "quantity"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium mb-1 capitalize">{field}</label>
              <input
                type="number"
                name={field}
                value={box[field]}
                onChange={(e) => handleChange(e, index)}
                placeholder={field}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
        </div>
      ))}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() =>
            setBoxes([...boxes, { id: "", length: 0, width: 0, height: 0, quantity: 1 }])
          }
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          + Add Box
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Pack
        </button>
      </div>
    </form>
  );
};

export default PackingForm;
