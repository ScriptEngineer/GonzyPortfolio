import React from 'react';
import { COMPANY } from '../siteConfig';

const agentPenny = new URL("/img/penny.png", import.meta.url);
const agentJason = new URL("/img/jason.png", import.meta.url);
const agentTerry = new URL("/img/terry.png", import.meta.url);

export default class CustomAgents extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        size: 'large',
        isChatOpen: false,
        chatMessages: [
          { id: 1, type: 'agent', text: "Hi there! I'm Penny, official AI assistant for GonzyDesigns. Would you like to schedule an appointment?" }
        ],
        chatInput: '',
        chatAgentTyping: false,
        jasonPhone: '',
        isTerryDemoActive: false,
        isTerryRecording: false,
        terryAudioReady: false,
        terryTranscript: '',
        terryMessages: [],
        terryAgentTyping: false,
        terrySchema: {
          tables: [
            {
              name: 'users',
              x: 20,
              y: 20,
              columns: [
                { name: 'id', type: 'SERIAL', isPrimary: true },
                { name: 'email', type: 'VARCHAR(255)' },
                { name: 'name', type: 'VARCHAR(100)' },
                { name: 'created_at', type: 'TIMESTAMP' }
              ]
            },
            {
              name: 'orders',
              x: 200,
              y: 20,
              columns: [
                { name: 'id', type: 'SERIAL', isPrimary: true },
                { name: 'user_id', type: 'INTEGER', foreignKey: { table: 'users', column: 'id' } },
                { name: 'total', type: 'DECIMAL(10,2)' },
                { name: 'status', type: 'VARCHAR(50)' },
                { name: 'created_at', type: 'TIMESTAMP' }
              ]
            },
            {
              name: 'products',
              x: 500,
              y: 150,
              columns: [
                { name: 'id', type: 'SERIAL', isPrimary: true },
                { name: 'name', type: 'VARCHAR(255)' },
                { name: 'price', type: 'DECIMAL(10,2)' },
                { name: 'category_id', type: 'INTEGER', foreignKey: { table: 'categories', column: 'id' } }
              ]
            },
            {
              name: 'order_items',
              x: 280,
              y: 180,
              columns: [
                { name: 'id', type: 'SERIAL', isPrimary: true },
                { name: 'order_id', type: 'INTEGER', foreignKey: { table: 'orders', column: 'id' } },
                { name: 'product_id', type: 'INTEGER', foreignKey: { table: 'products', column: 'id' } },
                { name: 'quantity', type: 'INTEGER' }
              ]
            },
            {
              name: 'categories',
              x: 500,
              y: 20,
              columns: [
                { name: 'id', type: 'SERIAL', isPrimary: true },
                { name: 'name', type: 'VARCHAR(100)' },
                { name: 'parent_id', type: 'INTEGER', foreignKey: { table: 'categories', column: 'id' } }
              ]
            }
          ],
          selectedTable: null,
          draggingTable: null,
          connectionString: '',
          isLoading: false,
          error: null,
          isConnected: false,
          tableData: null,
          tableDataLoading: false
        }
      }

      if (window.innerWidth < 500) {
        this.state.size = "small";
      }

      this.checkView = this.checkView.bind(this);
      this.revealSection = this.revealSections.bind(this);
      this.openChat = this.openChat.bind(this);
      this.closeChat = this.closeChat.bind(this);
      this.handleChatInput = this.handleChatInput.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.handleJasonPhoneChange = this.handleJasonPhoneChange.bind(this);
      this.submitJasonPhone = this.submitJasonPhone.bind(this);
      this.startTerryDemo = this.startTerryDemo.bind(this);
      this.startTerryRecording = this.startTerryRecording.bind(this);
      this.stopTerryRecording = this.stopTerryRecording.bind(this);
      this.sendTerryAudio = this.sendTerryAudio.bind(this);
      this.closeTerryDemo = this.closeTerryDemo.bind(this);
      this.selectTerryTable = this.selectTerryTable.bind(this);
      this.handleTableDragStart = this.handleTableDragStart.bind(this);
      this.handleTableDrag = this.handleTableDrag.bind(this);
      this.handleTableDragEnd = this.handleTableDragEnd.bind(this);
      this.fetchTerrySchema = this.fetchTerrySchema.bind(this);
      this.fetchTableData = this.fetchTableData.bind(this);
      this.handleDbConnectionChange = this.handleDbConnectionChange.bind(this);

      this.counterRef = React.createRef();
      this.chatMessagesRef = React.createRef();
      this.schemaRef = React.createRef();
      this.counterAnimated = false;
      this.ws = null;
      this.mediaRecorder = null;
      this.audioStream = null;
      this.audioChunks = [];
      this.terryAudioBlob = null;

  }

  checkView() {
  
    console.log(navigator.userAgent);

    window.onresize = () => {

      let resizeTimer = null;

      resizeTimer && clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {

        if (window.innerWidth < 500) {
          this.setState({
            size: 'small'
          });
        } else {
          this.setState({
            size: 'large'
          });
        }

      }, 600);

    }
    
  }

  revealSections() {
    let sTop = window.scrollY;

    const history = document.querySelector('.section__history');
    if (sTop > 580 && history && !history.classList.contains('present')) {
      history.classList.add('present');
    }
  }

  componentDidMount() {

    document.title = `Custom AI Agents | ${COMPANY.shortName}`;

    window.addEventListener('scroll', () => this.revealSections());
    window.addEventListener('load', () => this.revealSections());

    this.checkView();

    // Counter animation observer
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.counterAnimated) {
          this.counterAnimated = true;
          this.animateCounter();
        }
      });
    }, { threshold: 0.3 });

    if (this.counterRef.current) {
      counterObserver.observe(this.counterRef.current);
    }

    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';

    // WebSocket connection for chat
    this.ws = new WebSocket(`${proto}//${location.host}/ws`);

    this.ws.onopen = () => {
      console.log(`WebSocket connected to ${proto}//${location.host}/ws`);
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const agent = data.agent;
      const agentResponse = data.agentResponse;
      const userResponse = data.userResponse;
      console.log('Received Webhook:');
      console.log('AGENT:', agent);
      console.log('RESPONSE:', agentResponse);

      if (data.type === 'webhook' && agent === 'Penny') {

        const pennyResponse = {
          id: this.state.chatMessages.length + 1,
          type: 'agent',
          text: String(agentResponse)
        };
        
        this.setState({
          chatMessages: [...this.state.chatMessages, pennyResponse],
          chatAgentTyping: false
        }, () => {
          this.scrollToBottom();
        });

      } else if (data.type === 'webhook' && agent === 'Terry') {
        // Handle Terry's response (transcript or AI response)
        const { terryMessages } = this.state;
        let responseText = '';

        if (userResponse) {
          // Show what was transcribed
          this.setState({ terryTranscript: `${userResponse}` });
        } else if (agentResponse) {
          responseText = agentResponse;
          const terryResponse = {
            id: terryMessages.length + 1,
            type: 'agent',
            text: responseText
          };
          this.setState({
            terryMessages: [...terryMessages, terryResponse],
            terryAgentTyping: false
          });
        }
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

  }

  componentWillUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  }

  animateCounter() {
    const el = this.counterRef.current;
    if (!el) return;
    const target = 1000;
    const duration = 2000;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a fast-start, smooth-end feel
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = ">" + value.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);

  }

  openChat() {
    this.setState({ isChatOpen: true }, () => {
      this.scrollToBottom();
    });
  }

  closeChat() {
    this.setState({ isChatOpen: false });
  }

  handleChatInput(e) {
    this.setState({ chatInput: e.target.value });
  }

  handleJasonPhoneChange(e) {
    this.setState({ jasonPhone: e.target.value });
  }

  async submitJasonPhone(e) {
    e.preventDefault();
    const { jasonPhone } = this.state;
    if (!jasonPhone.trim()) return;

    try {
      const response = await fetch('/api/vapi/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: jasonPhone.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('VAPI call initiated:', data);
        this.setState({ jasonPhone: '' });
      } else {
        console.error('VAPI call failed:', data.error);
      }
    } catch (error) {
      console.error('Error calling VAPI:', error);
    }
  }

  startTerryDemo() {
    // Show the demo UI with the three request buttons
    this.setState({
      isTerryDemoActive: true,
      isTerryRecording: false,
      terryAudioReady: false,
      terryTranscript: 'Click "Start" above to begin recording your question.'
    }, () => {
      this.fetchTerrySchema();
    });
  }

  async startTerryRecording() {
    // Check for browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support microphone access.');
      return;
    }

    try {
      // Request microphone access
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        }
      });

      // Initialize MediaRecorder
      this.audioMimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      this.mediaRecorder = new MediaRecorder(this.audioStream, { mimeType: this.audioMimeType });

      // Clear previous chunks
      this.audioChunks = [];

      // Buffer chunks instead of sending immediately
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        this.stopTerryRecording();
      };

      // Clear any previous audio blob
      this.terryAudioBlob = null;

      // Start recording (chunks collected on stop)
      this.mediaRecorder.start();
      this.setState({
        isTerryRecording: true,
        terryAudioReady: false,
        terryTranscript: 'Recording... Click "Stop Request" when finished speaking.'
      });
      console.log('Audio recording started');

    } catch (error) {
      console.error('Error accessing microphone:', error);
      if (error.name === 'NotAllowedError') {
        alert('Microphone access was denied.\n\nPlease click the lock icon in the address bar and allow microphone access.');
      } else {
        alert(`Error accessing microphone: ${error.message}`);
      }
    }
  }

  stopTerryRecording() {
    // Stop MediaRecorder and store the audio blob (don't send yet)
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.onstop = () => {
        if (this.audioChunks.length > 0) {
          // Combine all chunks into a single blob and store it
          this.terryAudioBlob = new Blob(this.audioChunks, { type: this.audioMimeType });
          this.setState({
            terryAudioReady: true,
            terryTranscript: 'Recording complete. Click "Send Request" to transcribe.'
          });
        }
        this.audioChunks = [];
      };

      this.mediaRecorder.stop();
    }
    this.mediaRecorder = null;

    // Stop audio stream tracks
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }

    this.setState({
      isTerryRecording: false
    });
    console.log('Audio recording stopped');
  }

  sendTerryAudio() {
    // If still recording, stop it first
    if (this.state.isTerryRecording) {
      this.stopTerryRecording();
      // Wait a bit for the recording to finish processing
      setTimeout(() => {
        this.sendTerryAudioInternal();
      }, 100);
      return;
    }

    this.sendTerryAudioInternal();
  }

  sendTerryAudioInternal() {
    if (!this.terryAudioBlob) {
      console.warn('No audio to send');
      return;
    }

    // Convert blob to base64 and send via WebSocket
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Audio = reader.result.split(',')[1];
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.setState({
          terryTranscript: 'Processing audio...',
          terryAgentTyping: true
        });
        this.ws.send(JSON.stringify({
          type: 'terry',
          audio: base64Audio,
          mimeType: this.audioMimeType,
          timestamp: Date.now()
        }));
        // Clear the blob after sending
        this.terryAudioBlob = null;
        this.setState({ terryAudioReady: false });
      } else {
        console.warn('WebSocket not connected');
      }
    };
    reader.readAsDataURL(this.terryAudioBlob);
  }

  closeTerryDemo() {
    // Stop any active recording
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.mediaRecorder = null;

    // Stop audio stream tracks
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }

    // Clear audio data
    this.audioChunks = [];
    this.terryAudioBlob = null;

    // Reset state
    this.setState({
      isTerryDemoActive: false,
      isTerryRecording: false,
      terryAudioReady: false,
      terryTranscript: ''
    });
  }

  selectTerryTable(tableName) {
    this.setState(prevState => ({
      terrySchema: {
        ...prevState.terrySchema,
        selectedTable: prevState.terrySchema.selectedTable === tableName ? null : tableName
      }
    }));
  }

  handleTableDragStart(e, tableName) {
    e.preventDefault();
    const schemaContainer = this.schemaRef.current;
    if (!schemaContainer) return;

    const rect = schemaContainer.getBoundingClientRect();
    const table = this.state.terrySchema.tables.find(t => t.name === tableName);
    if (!table) return;

    this.dragOffset = {
      x: e.clientX - rect.left - table.x,
      y: e.clientY - rect.top - table.y
    };

    this.setState(prevState => ({
      terrySchema: {
        ...prevState.terrySchema,
        draggingTable: tableName
      }
    }));

    document.addEventListener('mousemove', this.handleTableDrag);
    document.addEventListener('mouseup', this.handleTableDragEnd);
  }

  handleTableDrag(e) {
    const { draggingTable } = this.state.terrySchema;
    if (!draggingTable) return;

    const schemaContainer = this.schemaRef.current;
    if (!schemaContainer) return;

    const rect = schemaContainer.getBoundingClientRect();
    const newX = Math.max(0, Math.min(rect.width - 140, e.clientX - rect.left - this.dragOffset.x));
    const newY = Math.max(0, Math.min(rect.height - 60, e.clientY - rect.top - this.dragOffset.y));

    this.setState(prevState => ({
      terrySchema: {
        ...prevState.terrySchema,
        tables: prevState.terrySchema.tables.map(table =>
          table.name === draggingTable
            ? { ...table, x: newX, y: newY }
            : table
        )
      }
    }));
  }

  handleTableDragEnd() {
    document.removeEventListener('mousemove', this.handleTableDrag);
    document.removeEventListener('mouseup', this.handleTableDragEnd);

    this.setState(prevState => ({
      terrySchema: {
        ...prevState.terrySchema,
        draggingTable: null
      }
    }));
  }

  handleDbConnectionChange(e) {
    this.setState(prevState => ({
      terrySchema: {
        ...prevState.terrySchema,
        connectionString: e.target.value,
        error: null
      }
    }));
  }

  async fetchTerrySchema() {
    const { connectionString } = this.state.terrySchema;

    this.setState(prevState => ({
      terrySchema: {
        ...prevState.terrySchema,
        isLoading: true,
        error: null
      }
    }));

    try {
      const response = await fetch('/api/db/schema', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        this.setState(prevState => ({
          terrySchema: {
            ...prevState.terrySchema,
            tables: data.schema.tables,
            selectedTable: null,
            isLoading: false,
            isConnected: true,
            error: null
          }
        }), () => {
          this.fetchTableData();
        });
      } else {
        this.setState(prevState => ({
          terrySchema: {
            ...prevState.terrySchema,
            isLoading: false,
            error: data.error
          }
        }));
      }
    } catch (error) {
      this.setState(prevState => ({
        terrySchema: {
          ...prevState.terrySchema,
          isLoading: false,
          error: error.message
        }
      }));
    }
  }

  async fetchTableData() {
    this.setState(prevState => ({
      terrySchema: {
        ...prevState.terrySchema,
        tableDataLoading: true
      }
    }));

    try {
      const response = await fetch('/api/db/tabledata', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        this.setState(prevState => ({
          terrySchema: {
            ...prevState.terrySchema,
            tableData: data.tableData,
            tableDataLoading: false
          }
        }));
      } else {
        this.setState(prevState => ({
          terrySchema: {
            ...prevState.terrySchema,
            tableDataLoading: false
          }
        }));
      }
    } catch (error) {
      this.setState(prevState => ({
        terrySchema: {
          ...prevState.terrySchema,
          tableDataLoading: false
        }
      }));
    }
  }

  sendMessage(e) {
    e.preventDefault();
    const { chatInput, chatMessages } = this.state;

    if (!chatInput.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      text: chatInput.trim()
    };

    this.setState({
      chatMessages: [...chatMessages, userMessage],
      chatInput: '',
      chatAgentTyping: true
    }, () => {
      this.scrollToBottom();
      // Send message via WebSocket to n8n
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ 
          type: 'penny', 
          content: userMessage.text 
        }));
      } else {
        console.warn('WebSocket not connected');
      }
    });
  }

  scrollToBottom() {
    if (this.chatMessagesRef.current) {
      this.chatMessagesRef.current.scrollTop = this.chatMessagesRef.current.scrollHeight;
    }
  }

  render() {

    return (
        <div className="wrapper">

          <div className="mainBody">

              <div className="page-hero">
                <div className="page-hero__inner">
                  <span className="page-hero__eyebrow">Custom AI Agents</span>
                  <h1 className="page-hero__title">AI Agents &amp; Custom Software, Built for Your Business</h1>
                  <p className="page-hero__lead">
                    {COMPANY.shortName} designs, builds, and deploys production-grade AI
                    assistants and web &amp; software solutions. Explore our flagship AI
                    agents below &mdash; each one is live and ready to demo.
                  </p>
                </div>
              </div>

              <div id="showcase" className="section__showcase">
                <div className="showcase__inner">

                  <div className="showcase__demos">

                    <div className="showcase__card showcase__card--penny">
                      <div className="showcase__card__content">

                        <div className="showcase__card__content__header">

                          <div className="showcase__card__image">
                            <img src={agentPenny} alt="AI Agent Penny" />
                          </div>

                          <div className="showcase__card__content__header__info">

                            <h3 className="showcase__card__title">Meet Penny</h3>
                            <p className="showcase__card__subtitle">Your friendly AI Agent front-desk and customer support representative</p>
                            
                          </div>

                        </div>

                        <p className="showcase__card__description">
                          Penny is an intelligent AI agent designed to transform how businesses handle customer interactions.
                          From answering simple questions about your business to scheduling appointments, making calls,
                          sending emails, and managing customer inquiries — Penny does it all with a personal touch.
                          Available 24/7, she ensures no customer is left waiting while maintaining the warmth and
                          professionalism your brand deserves.
                        </p>

                        <h3 className="showcase__card__demo-title">Demo / Setup Appointment</h3>

                        <div className="showcase__card__actions">
                          <a href="tel:+18172865319" className="showcase__card__btn showcase__card__btn--primary">
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                            </svg>
                            Call (817) 286 5319
                          </a>
                          <span className="showcase__card__actions__divider">or</span>
                          <button onClick={this.openChat} className="showcase__card__btn showcase__card__btn--primary">
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                            </svg>
                            Chat
                          </button>
                        </div>
                      </div>

                    </div>

                    <div className="showcase__card showcase__card--jason">
                      <div className="showcase__card__content">

                        <div className="showcase__card__content__header">

                          <div className="showcase__card__image">
                            <img src={agentJason} alt="AI Agent Jason" />
                          </div>

                          <div className="showcase__card__content__header__info">

                            <h3 className="showcase__card__title">Meet Jason</h3>
                            <p className="showcase__card__subtitle">Your ambitious and driven lead follow-up AI Agent</p>

                          </div>

                        </div>

                        <p className="showcase__card__description">
                          Jason is an agentic lead-followup AI built to plug directly into your existing business workflows—so he doesn’t just “chat,” he actually moves work forward using the same tools your team already relies on. He can be tailored to your business rules, your tone, your offers, your qualifying criteria, and your process from first contact to booked appointment (and beyond).
                        </p>

                        <h3 className="showcase__card__demo-title">Demo (US Domestic Only)</h3>

                        <div className="showcase__card__actions">
                          
                          <div className="showcase__card__field">
                            <form className="showcase__card__form" onSubmit={this.submitJasonPhone}>
                              <input
                                type="tel"
                                placeholder="Enter your phone"
                                value={this.state.jasonPhone}
                                onChange={this.handleJasonPhoneChange}
                                className="showcase__card__input"
                              />
                              <button type="submit" className="showcase__card__btn showcase__card__btn--primary">
                                <svg viewBox="0 0 16 16" fill="currentColor">
                                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                </svg>
                                Submit
                              </button>
                            </form>
                            <p className="showcase__card__disclaimer">
                              By submitting your phone number, you agree to receive a phone call from us.
                            </p>
                          </div>

                        </div>
                      </div>

                    </div>

                    <div className="showcase__card showcase__card--terry">
                      <div className="showcase__card__content">

                        <div className="showcase__card__content__header">

                          <div className="showcase__card__image">
                            <img src={agentTerry} alt="AI Agent Terry" />
                          </div>

                          <div className="showcase__card__content__header__info">

                            <h3 className="showcase__card__title">Meet Terry</h3>
                            <p className="showcase__card__subtitle">Your intelligent PostgreSQL database assistant</p>

                          </div>

                        </div>

                        <p className="showcase__card__description">
                          Terry is an AI-powered database assistant designed to make interacting with your PostgreSQL databases intuitive and conversational. Instead of writing complex SQL queries, simply describe what you want to know. Terry translates your requests into optimized queries and returns a simple answer.
                        </p>

                        <h3 className="showcase__card__demo-title">Demo (Microphone Access Required)</h3>

                        <div className="showcase__card__actions showcase__card__actions--terry">
                          <button
                            onClick={this.startTerryDemo}
                            className="showcase__card__btn showcase__card__btn--primary"
                          >
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M5 3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5v5a3 3 0 1 1-6 0v-5z"/>
                              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            Start Demo
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>


                </div>
              </div>


          </div>

          {/* Chat Modal */}
          <div className={`chat-modal ${this.state.isChatOpen ? 'chat-modal--open' : ''}`}>
            <div className="chat-modal__overlay" onClick={this.closeChat}></div>
            <div className="chat-modal__container">
              <div className="chat-modal__header">
                <div className="chat-modal__header__info">
                  <div className="chat-modal__avatar">
                    <img src={agentPenny} alt="AI Agent Penny" />
                  </div>
                  <div className="chat-modal__header__text">
                    <h3>Penny</h3>
                    <span className="chat-modal__status">
                      <span className="chat-modal__status__dot"></span>
                      Online
                    </span>
                  </div>
                </div>
                <button className="chat-modal__close" onClick={this.closeChat}>
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z"/>
                  </svg>
                </button>
              </div>
              <div className="chat-modal__messages" ref={this.chatMessagesRef}>
                {this.state.chatMessages.map((message) => (
                  <div key={message.id} className={`chat-modal__message chat-modal__message--${message.type}`}>
                    {message.type === 'agent' && (
                      <div className="chat-modal__message__avatar">
                        <img src={agentPenny} alt="AI Agent Penny" />
                      </div>
                    )}
                    <div className="chat-modal__message__bubble">
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
                {this.state.chatAgentTyping && (
                  <div className="chat-modal__message chat-modal__message--agent">
                    <div className="chat-modal__message__avatar">
                      <img src={agentPenny} alt="AI Agent Penny" />
                    </div>
                    <div className="chat-modal__message__bubble">
                      <div className="chat-modal__typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <form className="chat-modal__input" onSubmit={this.sendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={this.state.chatInput}
                  onChange={this.handleChatInput}
                  autoComplete="off"
                />
                <button type="submit">
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M.989 8 .064 2.68a1.342 1.342 0 0 1 1.85-1.462l13.402 5.744a1.13 1.13 0 0 1 0 2.076L1.913 14.782a1.343 1.343 0 0 1-1.85-1.463L.99 8Zm.603-5.288L2.38 7.25h4.87a.75.75 0 0 1 0 1.5H2.38l-.788 4.538L13.929 8Z"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Terry Demo Modal */}
          <div className={`terry-modal ${this.state.isTerryDemoActive ? 'terry-modal--open' : ''}`}>
            <div className="terry-modal__overlay" onClick={this.closeTerryDemo}></div>
            <div className="terry-modal__container">
              <div className="terry-modal__header">
                <div className="terry-modal__header__info">
                  <div className="terry-modal__avatar">
                    <img src={agentTerry} alt="AI Agent Terry" />
                  </div>
                  <div className="terry-modal__header__text">
                    <h3>Terry Demo</h3>
                    <span className="terry-modal__status">
                      {this.state.isTerryRecording ? (
                        <>
                          <span className="terry-modal__status__dot terry-modal__status__dot--recording"></span>
                          Recording
                        </>
                      ) : (
                        <>
                          <span className="terry-modal__status__dot"></span>
                          Ready
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="terry-modal__header__controls">
                  <button
                    onClick={this.state.isTerryRecording ? this.stopTerryRecording : this.startTerryRecording}
                    className={`terry-modal__btn-sm ${this.state.isTerryRecording ? 'terry-modal__btn-sm--secondary' : 'terry-modal__btn-sm--primary'}`}
                  >
                    {this.state.isTerryRecording ? (
                      <>
                        <svg viewBox="0 0 16 16" fill="currentColor">
                          <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                        </svg>
                        Stop
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" fill="currentColor">
                          <path d="M5 3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5v5a3 3 0 1 1-6 0v-5z"/>
                          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        Start
                      </>
                    )}
                  </button>
                  <button
                    onClick={this.sendTerryAudio}
                    className="terry-modal__btn-sm terry-modal__btn-sm--success"
                    disabled={!this.state.isTerryRecording && !this.state.terryAudioReady}
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                    Send
                  </button>
                </div>
                <button
                  className="terry-modal__close"
                  onClick={this.closeTerryDemo}
                  disabled={this.state.isTerryRecording}
                >
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z"/>
                  </svg>
                </button>
              </div>
              <div className="terry-modal__content">
                {/* ERD Schema Visualization */}
                <div className="terry-modal__schema">
                  <div className="terry-modal__schema-header">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                    </svg>
                    <span>Database Schema</span>
                    <span className="terry-modal__schema-hint">
                      {this.state.terrySchema.isConnected
                        ? `(${this.state.terrySchema.tables.length} tables - drag to rearrange)`
                        : '(showing sample data - connect to see your schema)'
                      }
                    </span>
                  </div>
                  <div className="terry-modal__erd" ref={this.schemaRef}>
                    {/* SVG Layer for connection lines */}
                    <svg className="terry-modal__erd-lines">
                      {this.state.terrySchema.tables.flatMap((table) =>
                        table.columns
                          .filter(col => col.foreignKey)
                          .map((col) => {
                            const targetTable = this.state.terrySchema.tables.find(
                              t => t.name === col.foreignKey.table
                            );
                            if (!targetTable) return null;

                            // Calculate line positions (center of tables)
                            const sourceX = table.x + 70;
                            const sourceY = table.y + 20;
                            const targetX = targetTable.x + 70;
                            const targetY = targetTable.y + 20;

                            // Create a curved path
                            const midX = (sourceX + targetX) / 2;
                            const midY = (sourceY + targetY) / 2;
                            const dx = targetX - sourceX;
                            const dy = targetY - sourceY;
                            const curvature = Math.min(Math.abs(dx), Math.abs(dy)) * 0.3;

                            return (
                              <g key={`${table.name}-${col.name}`}>
                                <path
                                  d={`M ${sourceX} ${sourceY} Q ${midX} ${midY - curvature} ${targetX} ${targetY}`}
                                  className="terry-modal__erd-line"
                                />
                                {/* Arrow marker at target */}
                                <circle
                                  cx={targetX}
                                  cy={targetY}
                                  r="4"
                                  className="terry-modal__erd-arrow"
                                />
                              </g>
                            );
                          })
                      )}
                    </svg>

                    {/* Draggable Tables */}
                    {this.state.terrySchema.tables.map((table) => {
                      const isSelected = this.state.terrySchema.selectedTable === table.name;
                      const isDragging = this.state.terrySchema.draggingTable === table.name;

                      return (
                        <div
                          key={table.name}
                          className={`terry-modal__erd-table ${isSelected ? 'terry-modal__erd-table--selected' : ''} ${isDragging ? 'terry-modal__erd-table--dragging' : ''}`}
                          style={{ left: table.x, top: table.y }}
                          onMouseDown={(e) => this.handleTableDragStart(e, table.name)}
                          onClick={() => this.selectTerryTable(table.name)}
                        >
                          <div className="terry-modal__erd-table-header">
                            <svg viewBox="0 0 16 16" fill="currentColor">
                              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                            </svg>
                            <span>{table.name}</span>
                          </div>
                          {isSelected && (
                            <div className="terry-modal__erd-table-columns">
                              {table.columns.map((column) => (
                                <div key={column.name} className="terry-modal__erd-column">
                                  <span className="terry-modal__erd-column-icons">
                                    {column.isPrimary && (
                                      <svg className="terry-modal__erd-pk" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1H7.163a.5.5 0 0 1-.45-.285A3 3 0 0 0 4 5z"/>
                                        <circle cx="4" cy="8" r="1"/>
                                      </svg>
                                    )}
                                    {column.foreignKey && (
                                      <svg className="terry-modal__erd-fk" viewBox="0 0 16 16" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1z"/>
                                      </svg>
                                    )}
                                  </span>
                                  <span className="terry-modal__erd-column-name">{column.name}</span>
                                  <span className="terry-modal__erd-column-type">{column.type}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Table Data Preview */}
                <div className="terry-modal__table-data">
                  <div className="terry-modal__table-data-header">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                    </svg>
                    <span>{this.state.terrySchema.selectedTable || 'Table Data'}</span>
                    <span className="terry-modal__table-data-hint">
                      {this.state.terrySchema.selectedTable ? 'Table Data' : 'Select a table to view data'}
                    </span>
                  </div>
                  <div className="terry-modal__table-data-grid">
                    {!this.state.terrySchema.selectedTable ? (
                      <div className="terry-modal__table-data-empty">Click on a table to view its data.</div>
                    ) : this.state.terrySchema.tableDataLoading ? (
                      <div className="terry-modal__table-data-loading">Loading rows...</div>
                    ) : this.state.terrySchema.tableData && this.state.terrySchema.tableData[this.state.terrySchema.selectedTable] && this.state.terrySchema.tableData[this.state.terrySchema.selectedTable].length > 0 ? (
                      <table>
                        <thead>
                          <tr>
                            {Object.keys(this.state.terrySchema.tableData[this.state.terrySchema.selectedTable][0]).map((col) => (
                              <th key={col}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.terrySchema.tableData[this.state.terrySchema.selectedTable].map((row, i) => (
                            <tr key={i}>
                              {Object.values(row).map((val, j) => (
                                <td key={j}>{val !== null && val !== undefined ? String(val) : 'NULL'}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="terry-modal__table-data-empty">No data available</div>
                    )}
                  </div>
                </div>

                {/* Agent Output */}
                <div className="terry-modal__output">
                  <div className="terry-modal__output-header">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25.11 25.11 0 0 1-4.244-.727c.13-.656.753-1.234 1.562-1.3a28.294 28.294 0 0 0 4.78-.54c.813.07 1.431.644 1.56 1.3a25.11 25.11 0 0 1-4.244.727l-.92-.9a.25.25 0 0 0-.282-.068ZM2 10.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"/>
                    </svg>
                    <span>Output</span>
                  </div>
                  <div className="terry-modal__output-body">
                    {this.state.terryMessages.length > 0 ? (
                      this.state.terryMessages.map((msg) => (
                        <div key={msg.id} className={`terry-modal__output-message terry-modal__output-message--${msg.type}`}>
                          <span className="terry-modal__output-message-label">{msg.type === 'user' ? 'You' : 'Terry'}</span>
                          <span className="terry-modal__output-message-text">{msg.text}</span>
                        </div>
                      ))
                    ) : (
                      <div className="terry-modal__output-placeholder">
                        {this.state.terryTranscript || 'Agent responses will appear here.'}
                      </div>
                    )}
                    {this.state.terryAgentTyping && (
                      <div className="terry-modal__output-message terry-modal__output-message--agent">
                        <span className="terry-modal__output-message-text">
                          <div className="terry-modal__typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    );

  }

}

