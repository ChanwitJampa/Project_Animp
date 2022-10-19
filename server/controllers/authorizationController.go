package controllers

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"testAPI/initializers"
	"testAPI/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"

	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"io/ioutil"
)

func Signup(c *gin.Context) {
	// get the emal/pass off req body
	var body struct {
		Username string
		Password string
		Name     string
	}

	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	fmt.Println(string(hash))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})

		return
	}

	//create the account
	user := models.User{Email: body.Username, Pwd: string(hash), Role: "user", Name: body.Name}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})

		return
	}

	//respone
	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	// defender for protect brute force
	// d := defender.New(10, 1*60*time.Second, 1*time.Hour)

	// get the email and pass req body
	var body struct {
		Username string
		Password string
	}

	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}
	// fmt.Println("ip addr = " + c.Request.RemoteAddr)
	// firstAddress := strings.Split(c.Request.RemoteAddr, ",")[0]
	// fmt.Println("ip addr = " + firstAddress)

	// if client, ok := d.Client(c.Request.RemoteAddr); ok && !client.Banned() {
	// 	if d.Inc(c.ClientIP()) {

	// 	}
	// }
	// look up requested user

	var user models.User
	initializers.DB.First(&user, "email = ?", body.Username)

	if user.ID == 0 {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return
	}

	// compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Pwd), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return
	}

	// generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// sign and get the complete encode token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	// send it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	/////////////////////////////////// RSA///////////////////////
	// Here is the text we want to encrypt.
	toJson, err := json.Marshal(user)
	plaintext := string(toJson)
	fmt.Println(" \n plantText : ", plaintext, "\n\n")
	publicKey, err := ioutil.ReadFile("pubkey.pem")
	if err != nil {
		log.Fatal(err)
	}

	start := 0
	end := 0
	realCipher := ""

	for i := 0; i <= int(len(plaintext)/50); i++ {

		if i == int(len(plaintext)/50) {
			start = end
			end = len(plaintext)
		} else {
			start = end
			end = ((i + 1) * 50)
		}
		SubText := plaintext[start:end]
		fmt.Println(" \n SubText : ", SubText, "")
		encrypted, _ := RsaEncrypt(publicKey, []byte(SubText))
		//fmt.Println(" \n encrypted : ", encrypted, "\n\n")
		encoding := base64.StdEncoding.EncodeToString([]byte(encrypted))
		fmt.Print(encoding)
		realCipher += encoding
		if end == len(plaintext) {
			break
		}
	}
	fmt.Println("\ncipherText is : ", realCipher, "\n")
	c.JSON(http.StatusOK, realCipher)

}
func Validation(c *gin.Context) {
	user, _ := c.Get("user")

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": user,
	// })
	c.JSON(http.StatusOK, user)
}

func RsaEncrypt(publicKey []byte, origData []byte) ([]byte, error) {
	block, _ := pem.Decode(publicKey)
	if block == nil {
		return nil, errors.New("public key error")
	}
	pubInterface, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	pub := pubInterface.(*rsa.PublicKey)
	return rsa.EncryptPKCS1v15(rand.Reader, pub, origData)
}

func generateKeyPair(bits int) (*rsa.PrivateKey, *rsa.PublicKey) {
	// This method requires a random number of bits.
	privateKey, err := rsa.GenerateKey(rand.Reader, bits)
	if err != nil {
		fmt.Println("Error: ", err)
	}

	// The public key is part of the PrivateKey struct
	return privateKey, &privateKey.PublicKey
}

// Export public key as a string in PEM format
func exportPubKeyAsPEMStr(pubkey *rsa.PublicKey) string {
	pubKeyPem := string(pem.EncodeToMemory(
		&pem.Block{
			Type:  "RSA PUBLIC KEY",
			Bytes: x509.MarshalPKCS1PublicKey(pubkey),
		},
	))
	return pubKeyPem
}

// Export private key as a string in PEM format
func exportPrivKeyAsPEMStr(privkey *rsa.PrivateKey) string {
	privKeyPem := string(pem.EncodeToMemory(
		&pem.Block{
			Type:  "RSA PRIVATE KEY",
			Bytes: x509.MarshalPKCS1PrivateKey(privkey),
		},
	))
	return privKeyPem

}

// Save string to a file
func saveKeyToFile(keyPem, filename string) {
	pemBytes := []byte(keyPem)
	ioutil.WriteFile(filename, pemBytes, 0400)
}
