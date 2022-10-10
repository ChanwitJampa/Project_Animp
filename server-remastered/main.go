package main

import (
	"fmt"

	"animemap/api/initializers"
)

func init() {
	initializers.LoadEnvVariables()
}

func main() {
	fmt.Println("hello 2")
}
