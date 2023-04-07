import { useState } from "react";
import Dropdown from "react-dropdown";
import { useDispatch } from "react-redux";
import { Useradded } from "./UserSlice";
const countries = ["USA", "Canada", "UK", "Australia"];

const UserForm = () => {
  const Dispatch = useDispatch();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [file, setFile] = useState(null);

  const [result, setResult] = useState("");

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value.replace(/[^a-zA-Z ]/g, ""));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value.replace(/\D/g, ""));
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value.replace(/[^a-zA-Z0-9 .,@_]/g, ""));
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setResult("Please select a file to upload.");
      return;
    }

    if (file.type !== "application/pdf") {
      setResult("Only PDF files are allowed.");
      return;
    }

    // if (file.size < 1 * 1024 * 1024 || file.size > 5 * 1024 * 1024) {
    //   setResult("File size should be between 15MB and 50MB.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
      onUploadProgress: (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setResult(`${percent}%`);
        }
      }
    });

    if (response.ok) {
      setResult(`File ${file.name} uploaded successfully.`);
    } else {
      setResult(`Error uploading file: ${response.statusText}`);
    }
    Dispatch(
      Useradded({
        customerName,
        email,
        phone,
        country,
        additionalInfo,
        file,
        result
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={handleCustomerNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <Dropdown
          id="country"
          options={countries}
          selectedOption={country}
          onSelectOption={handleCountryChange}
        />
      </div>
      <div>
        <label htmlFor="additionalInfo">Additional Info:</label>
        <textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={handleAdditionalInfoChange}
          required
        />
      </div>
      <div>
        <h6>Upload PDF File</h6>
        <label htmlFor="file-input">Select PDF file (15MB to 50MB)</label>
        <input
          type="file"
          id="file-input"
          name="file"
          accept=".pdf"
          required
          onChange={handleFileChange}
        />
        <br />
        <button type="submit">Upload</button>
        <div>{result}</div>
      </div>
    </form>
  );
};

export default UserForm;
