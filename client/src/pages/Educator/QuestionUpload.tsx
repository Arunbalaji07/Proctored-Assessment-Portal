import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import * as pdfjsLib from 'pdfjs-dist'; // Corrected import
import EducatorNavbar from '@/components/EducatorNavbar';

const ManualQuestionUpload: React.FC = () => {
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'bulk'>('manual');
  const [questionType, setQuestionType] = useState<'MCQ' | 'SmallAnswer' | 'Coding'>('MCQ');
  const [richTextEditorValue, setRichTextEditorValue] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractedQuestions, setExtractedQuestions] = useState<any[]>([]); // Define a proper type based on extracted data
  const [questionsList, setQuestionsList] = useState<any[]>([]); // Store added questions
  const [sampleCode, setSampleCode] = useState('');
  const [testCases, setTestCases] = useState<{ input: string; output: string }[]>([]);

  const handleUploadMethodChange = (method: 'manual' | 'bulk') => {
    setUploadMethod(method);
    if (method === 'manual') {
      setPdfFile(null);
      setExtractedQuestions([]);
    }
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);

      // Extract text from PDF using pdf.js
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        try {
          const pdfData = new Uint8Array(fileReader.result as ArrayBuffer);
          const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
          const numPages = pdfDoc.numPages;
          const extractedText: string[] = [];

          for (let i = 1; i <= numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const content = await page.getTextContent();
            const text = content.items.map((item: any) => item.str).join(' ');
            extractedText.push(text);
          }

          // Simple parsing (Replace with your own logic)
          // Convert extractedText to a single string if it's an array
          const extractedTextString = extractedText.flat().join('\n');

          // Split the string into lines and create question objects
          const questions = extractedTextString.split('\n').map(line => ({
            question: line,
            options: ['', '', '', ''],
            correctAnswer: ''
          }));

          setExtractedQuestions(questions);
        } catch (error) {
          console.error('Error extracting text from PDF:', error);
        }
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    setOptions(prev => {
      const newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleSaveQuestion = () => {
    const newQuestion = {
      question: richTextEditorValue,
      options,
      correctAnswer,
      questionType,
      tags,
      categories,
      sampleCode,
      testCases
    };

    setQuestionsList(prev => [...prev, newQuestion]);

    // Reset fields after saving
    setRichTextEditorValue('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setTags([]);
    setCategories([]);
    setSampleCode('');
    setTestCases([]);
  };

  const handleEditExtractedQuestion = (index: number, updatedQuestion: any) => {
    setExtractedQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[index] = updatedQuestion;
      return newQuestions;
    });
  };

  const handleAddTestCase = () => {
    setTestCases(prev => [...prev, { input: '', output: '' }]);
  };

  const handleTestCaseChange = (index: number, field: 'input' | 'output', value: string) => {
    setTestCases(prev => {
      const newTestCases = [...prev];
      newTestCases[index] = { ...newTestCases[index], [field]: value };
      return newTestCases;
    });
  };

  return (
    <><div className="min-h-screen bg-gray-900 text-white ">
        <EducatorNavbar />
        <div className='p-6'>
          <h1 className="text-3xl font-bold mb-8">Manual Question Upload</h1>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <div className="flex items-center space-x-4 mb-6">
                  <button
                      className={`px-4 py-2 rounded ${uploadMethod === 'manual' ? 'bg-teal-500' : 'bg-gray-700'}`}
                      onClick={() => handleUploadMethodChange('manual')}
                  >
                      Manual Upload
                  </button>
                  <button
                      className={`px-4 py-2 rounded ${uploadMethod === 'bulk' ? 'bg-teal-500' : 'bg-gray-700'}`}
                      onClick={() => handleUploadMethodChange('bulk')}
                  >
                      Bulk Upload
                  </button>
              </div>

              {uploadMethod === 'manual' && (
                  <div>
                      <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Question Type</label>
                          <select
                              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                              value={questionType}
                              onChange={(e) => setQuestionType(e.target.value as 'MCQ' | 'SmallAnswer' | 'Coding')}
                          >
                              <option value="MCQ">MCQ</option>
                              <option value="SmallAnswer">Small Answer</option>
                              <option value="Coding">Coding</option>
                          </select>
                      </div>

                      <div className="mb-4">
                          <ReactQuill
                              value={richTextEditorValue}
                              onChange={setRichTextEditorValue}
                              placeholder="Enter question details" />
                      </div>

                      {questionType === 'MCQ' && (
                          <div>
                              <div className="mb-4">
                                  <label className="block text-sm font-medium mb-2">Options</label>
                                  {options.map((option, index) => (
                                      <input
                                          key={index}
                                          type="text"
                                          className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                                          value={option}
                                          onChange={(e) => handleQuestionChange(index, e.target.value)}
                                          placeholder={`Option ${index + 1}`} />
                                  ))}
                              </div>
                              <div className="mb-4">
                                  <label className="block text-sm font-medium mb-2">Correct Answer</label>
                                  <input
                                      type="text"
                                      className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                                      value={correctAnswer}
                                      onChange={(e) => setCorrectAnswer(e.target.value)} />
                              </div>
                          </div>
                      )}

                      {questionType === 'SmallAnswer' && (
                          <div>
                              <div className="mb-4">
                                  <label className="block text-sm font-medium mb-2">Correct Answer</label>
                                  <input
                                      type="text"
                                      className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                                      value={correctAnswer}
                                      onChange={(e) => setCorrectAnswer(e.target.value)} />
                              </div>
                          </div>
                      )}

                      {questionType === 'Coding' && (
                          <div>
                              <div className="mb-4">
                                  <label className="block text-sm font-medium mb-2">Sample Code</label>
                                  <textarea
                                      className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                                      value={sampleCode}
                                      onChange={(e) => setSampleCode(e.target.value)}
                                      placeholder="Provide sample code" />
                              </div>
                              <div className="mb-4">
                                  <label className="block text-sm font-medium mb-2">Test Cases</label>
                                  {testCases.map((testCase, index) => (
                                      <div key={index} className="mb-2">
                                          <textarea
                                              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                                              value={testCase.input}
                                              onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                                              placeholder="Input" />
                                          <textarea
                                              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                                              value={testCase.output}
                                              onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                                              placeholder="Output" />
                                      </div>
                                  ))}
                                  <button
                                      className="px-4 py-2 bg-teal-500 rounded-lg"
                                      onClick={handleAddTestCase}
                                  >
                                      Add Test Case
                                  </button>
                              </div>
                          </div>
                      )}

                      <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Tags</label>
                          <input
                              type="text"
                              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                              placeholder="Enter tags"
                              onChange={(e) => setTags(e.target.value.split(','))} />
                      </div>

                      <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Categories</label>
                          <input
                              type="text"
                              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                              placeholder="Enter categories"
                              onChange={(e) => setCategories(e.target.value.split(','))} />
                      </div>

                      <button
                          className="px-4 py-2 bg-teal-500 rounded-lg"
                          onClick={handleSaveQuestion}
                      >
                          Save Question
                      </button>
                  </div>
              )}

              {uploadMethod === 'bulk' && (
                  <div>
                      <input
                          type="file"
                          accept=".pdf"
                          className="mb-4"
                          onChange={handlePdfUpload} />
                      {extractedQuestions.length > 0 && (
                          <div>
                              <h2 className="text-xl font-bold mb-4">Extracted Questions</h2>
                              <div>
                                  {extractedQuestions.map((question, index) => (
                                      <div key={index} className="mb-4">
                                          <ReactQuill
                                              value={question.question}
                                              onChange={(value) => handleEditExtractedQuestion(index, { ...question, question: value })}
                                              placeholder="Enter question details" />
                                          {questionType === 'MCQ' && (
                                              <div>
                                                  <div className="mb-4">
                                                      <label className="block text-sm font-medium mb-2">Options</label>
                                                      {question.options.map((option, optIndex) => (
                                                          <input
                                                              key={optIndex}
                                                              type="text"
                                                              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                                                              value={option}
                                                              onChange={(e) => {
                                                                  const newOptions = [...question.options];
                                                                  newOptions[optIndex] = e.target.value;
                                                                  handleEditExtractedQuestion(index, { ...question, options: newOptions });
                                                              } }
                                                              placeholder={`Option ${optIndex + 1}`} />
                                                      ))}
                                                  </div>
                                                  <div className="mb-4">
                                                      <label className="block text-sm font-medium mb-2">Correct Answer</label>
                                                      <input
                                                          type="text"
                                                          className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                                                          value={question.correctAnswer}
                                                          onChange={(e) => handleEditExtractedQuestion(index, { ...question, correctAnswer: e.target.value })} />
                                                  </div>
                                              </div>
                                          )}
                                          {questionType === 'SmallAnswer' && (
                                              <div>
                                                  <div className="mb-4">
                                                      <label className="block text-sm font-medium mb-2">Correct Answer</label>
                                                      <input
                                                          type="text"
                                                          className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
                                                          value={question.correctAnswer}
                                                          onChange={(e) => handleEditExtractedQuestion(index, { ...question, correctAnswer: e.target.value })} />
                                                  </div>
                                              </div>
                                          )}
                                          {questionType === 'Coding' && (
                                              <div>
                                                  <div className="mb-4">
                                                      <label className="block text-sm font-medium mb-2">Sample Code</label>
                                                      <textarea
                                                          className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                                                          value={question.sampleCode}
                                                          onChange={(e) => handleEditExtractedQuestion(index, { ...question, sampleCode: e.target.value })}
                                                          placeholder="Provide sample code" />
                                                  </div>
                                                  <div className="mb-4">
                                                      <label className="block text-sm font-medium mb-2">Test Cases</label>
                                                      {question.testCases.map((testCase, tcIndex) => (
                                                          <div key={tcIndex} className="mb-2">
                                                              <textarea
                                                                  className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                                                                  value={testCase.input}
                                                                  onChange={(e) => {
                                                                      const newTestCases = [...question.testCases];
                                                                      newTestCases[tcIndex].input = e.target.value;
                                                                      handleEditExtractedQuestion(index, { ...question, testCases: newTestCases });
                                                                  } }
                                                                  placeholder="Input" />
                                                              <textarea
                                                                  className="w-full bg-gray-700 text-white p-3 rounded-lg mb-2 focus:outline-none"
                                                                  value={testCase.output}
                                                                  onChange={(e) => {
                                                                      const newTestCases = [...question.testCases];
                                                                      newTestCases[tcIndex].output = e.target.value;
                                                                      handleEditExtractedQuestion(index, { ...question, testCases: newTestCases });
                                                                  } }
                                                                  placeholder="Output" />
                                                          </div>
                                                      ))}
                                                      <button
                                                          className="px-4 py-2 bg-teal-500 rounded-lg"
                                                          onClick={() => {
                                                              const newTestCases = [...question.testCases, { input: '', output: '' }];
                                                              handleEditExtractedQuestion(index, { ...question, testCases: newTestCases });
                                                          } }
                                                      >
                                                          Add Test Case
                                                      </button>
                                                  </div>
                                              </div>
                                          )}
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              )}
          </div>
      </div>
      </div></>
  );
};

export default ManualQuestionUpload;
