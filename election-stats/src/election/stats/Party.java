package election.stats;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Party {
	String name;
	String ideology;
	ChotaPerson chairPerson;
	ArrayList<ChotaPerson> notablePerson;
	String image;
	String history;

	public Party(String name, String ideology, ChotaPerson chairPerson, ArrayList<ChotaPerson> notablePerson, String image,
			String histroy) {
		super();
		this.name = name;
		this.ideology = ideology;
		this.chairPerson = chairPerson;
		this.notablePerson = notablePerson;
		this.image = image;
		this.history = histroy;
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

	public ChotaPerson getChairPerson() {
		return chairPerson;
	}

	public void setChairPerson(ChotaPerson chairPerson) {
		this.chairPerson = chairPerson;
	}

	public ArrayList<ChotaPerson> getNotablePerson() {
		return notablePerson;
	}

	public void setNotablePerson(ArrayList<ChotaPerson> notablePerson) {
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
