package election.stats;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Party {
	String name;
	String ideology;
	Person chairPerson;
	ArrayList<Person> notablePerson;
	String image;
	String histroy;

	public Party(String name, String ideology, Person chairPerson, ArrayList<Person> notablePerson, String image,
			String histroy) {
		super();
		this.name = name;
		this.ideology = ideology;
		this.chairPerson = chairPerson;
		this.notablePerson = notablePerson;
		this.image = image;
		this.histroy = histroy;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdeology() {
		return ideology;
	}

	public void setIdeology(String ideology) {
		this.ideology = ideology;
	}

	public Person getChairPerson() {
		return chairPerson;
	}

	public void setChairPerson(Person chairPerson) {
		this.chairPerson = chairPerson;
	}

	public ArrayList<Person> getNotablePerson() {
		return notablePerson;
	}

	public void setNotablePerson(ArrayList<Person> notablePerson) {
		this.notablePerson = notablePerson;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getHistroy() {
		return histroy;
	}

	public void setHistroy(String histroy) {
		this.histroy = histroy;
	}
}
