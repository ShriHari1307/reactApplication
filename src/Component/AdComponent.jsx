import React, { Component } from "react";

class AdComponent extends Component {
  constructor(props) {
    super(props);


    // array of ads
    this.ads = [
      {
        title: "Get the Best Health Insurance Now!",
        description:
          "Affordable plans to keep you and your family healthy. Get a quote today!",
        image: "/health-insurance.jpg",
      },
      {
        title: "Secure Your Future with Life Insurance",
        description:
          "Protect your loved ones and your future with our comprehensive life insurance plans.",
        image: "/37156.jpg",
      },
      {
        title: "Home Insurance – Protect What Matters Most",
        description:
          "Keep your home safe from unforeseen events. Get the best home insurance coverage now.",
        image: "/home-insurance.jpg",
      },
      {
        title: "Car Insurance That Saves You Money",
        description:
          "Compare rates and save big on car insurance. Get a free quote today!",
        image: "/car-insurance.jpg",
      },
      {
        title: "Travel Insurance for Your Next Trip",
        description:
          "Don't travel without coverage! Get travel insurance for your next adventure.",
        image: "/travel-insurance.jpg",
      },
    ];

    // array of messages
    this.messages = [
      "Protecting what matters most.",
      "Insurance made simple and affordable.",
      "Your peace of mind, our priority.",
      "Coverage for every step of your journey.",
      "Securing your future with the best plans.",
    ];

    this.state = {
      currentMessageIndex: 0,
      currentAd: null,
      displayText: "",
    };
  }

  // change after 5 sec
  componentDidMount() {
    this.selectRandomAd();
    this.typeMessage();
    this.adInterval = setInterval(() => {
      this.selectRandomAd();
    }, 5000); 
  }

  componentWillUnmount() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
    if (this.adInterval) {
      clearInterval(this.adInterval);
    }
  }

  //select random ad
  selectRandomAd() {
    const randomAdIndex = Math.floor(Math.random() * this.ads.length);
    this.setState({
      currentAd: this.ads[randomAdIndex],
    });
  }

  typeMessage() {
    const currentMessage = this.messages[this.state.currentMessageIndex];
    let index = 0;

    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    this.typingInterval = setInterval(() => {
      if (index < currentMessage.length) {
        this.setState((prevState) => ({
          displayText: currentMessage.slice(0, index + 1),
        }));
        index++;
      } else {
        clearInterval(this.typingInterval);
        setTimeout(() => {
          this.setState(
            (prevState) => ({
              currentMessageIndex:
                (prevState.currentMessageIndex + 1) % this.messages.length,
              displayText: "",
            }),
            () => {
              this.typeMessage();
            }
          );
        }, 2000);
      }
    }, 100);
  }

  render() {
    const { currentAd, displayText } = this.state;

    if (!currentAd) return null;

    return (
      <div
        className="insurance-ad-container"
        style={{
          backgroundColor: "#F5F7FA",
          color: "#333",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "300px",
          margin: "20px auto",
        }}
      >
        <div className="ad-content">
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {currentAd.title}
          </h2>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            {currentAd.description}
          </p>
          <img
            src={currentAd.image}
            alt={currentAd.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "6px",
              border: "1px solid #DDD",
            }}
          />
        </div>
        <div
          className="typing-animation"
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#555",
            fontStyle: "italic",
            marginTop: "15px",
            minHeight: "30px",
          }}
        >
          {displayText}
        </div>
      </div>
    );
  }
}

export default AdComponent;
