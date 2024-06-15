import React, { useState } from 'react';
import { Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { FaTrash, FaDownload } from 'react-icons/fa';
import Papa from 'papaparse';

const CSVUploader = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setHeaders(result.meta.fields);
          setData(result.data);
        },
      });
    }
  };

  const handleAddRow = () => {
    setData([...data, {}]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'edited_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Input type="file" accept=".csv" onChange={handleFileUpload} mb={4} bg="gray.700" color="white" />
      <Button onClick={handleAddRow} mb={4} bg="blue.500" color="white">Add Row</Button>
      <Table variant="simple" bg="gray.700" color="white">
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header} color="white">{header}</Th>
            ))}
            <Th color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {headers.map((header) => (
                <Td key={header}>
                  <Input
                    value={row[header] || ''}
                    onChange={(e) => handleInputChange(rowIndex, header, e.target.value)}
                    bg="gray.600"
                    color="white"
                  />
                </Td>
              ))}
              <Td>
                <IconButton
                  aria-label="Remove Row"
                  icon={<FaTrash />}
                  onClick={() => handleRemoveRow(rowIndex)}
                  bg="red.500"
                  color="white"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleDownload} mt={4} leftIcon={<FaDownload />} bg="green.500" color="white">Download CSV</Button>
    </div>
  );
};

export default CSVUploader;