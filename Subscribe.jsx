import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Container, Card } from 'semantic-ui-react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    //Fetch initial message (if needed)
    fetch('https://localhost:3301/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching initial message: ', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:3301/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage('Subscription successful!');
        setEmail(''); // Clear the email input
      } else {
        setMessage('Error subscribing. Please try again later.');
      }
    } catch (error) {
      setMessage('Network error. Please check your connection.');
    }
  };

  return (
    <div>
      <Container>
        <center>
          <Form onSubmit={handleSubmit}>
            <label>SIGN UP FOR OUR DAILY INSIDER</label>
            <Form.Field inline>
              <Input 
                type="email"
                placeholder='Enter your email'
                value= {email}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button primary>Subscribe</Button>
            </Form.Field>
          </Form>
          {message && <p>{message}</p>}
        </center>
      </Container>
      <br />
      <br />
    </div>
  );
};

export default Subscribe;
