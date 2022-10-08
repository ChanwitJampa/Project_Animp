package main

import (
	"fmt"

	"github.com/fourth1755/project-animp2022/server-remastered/initializers"
)

func init() {
	initializers.LoadEnvVariables()
}

func main() {
	fmt.Println("hello 2")
}
