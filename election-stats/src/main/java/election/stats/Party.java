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
	String history;
	int followers;

	public Party(String name, String ideology, Person chairPerson,
			ArrayList<Person> notablePerson, String image, String history,
			int followers) {
		super();
		this.name = name;
		this.ideology = ideology;
		this.chairPerson = chairPerson;
		this.notablePerson = notablePerson;
		this.image = image;
		this.history = history;
		this.followers = followers;
	}

	public int getFollowers() {
		return followers;
	}

	public void setFollowers(int followers) {
		this.followers = followers;
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

	public String getHistory() {
		return history;
	}

	public void setHistory(String histroy) {
		this.history = histroy;
	}
}
